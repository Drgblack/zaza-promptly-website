// Direct Brevo API integration for reliable email subscription
// This provides a simple, direct way to add contacts to Brevo lists

interface BrevoContact {
  email: string
  firstName?: string
  lastName?: string
  attributes?: Record<string, any>
}

interface BrevoResponse {
  success: boolean
  message: string
  id?: number
}

export class BrevoDirectAPI {
  private static readonly BREVO_API_BASE = 'https://api.brevo.com/v3'

  /**
   * Add a contact directly to the Brevo list
   */
  static async addContact(contact: BrevoContact): Promise<BrevoResponse> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      const listId = process.env.BREVO_LIST_ID

      // Validate environment variables
      if (!apiKey) {
        console.error('BREVO_API_KEY is not configured')
        return { success: false, message: 'Brevo API key not configured' }
      }

      if (!listId) {
        console.error('BREVO_LIST_ID is not configured')
        return { success: false, message: 'Brevo list ID not configured' }
      }

      const listIdNumber = parseInt(listId, 10)
      if (isNaN(listIdNumber)) {
        console.error('BREVO_LIST_ID is not a valid number:', listId)
        return { success: false, message: 'Invalid Brevo list ID' }
      }

      // Prepare the contact payload
      const payload = {
        email: contact.email,
        attributes: {
          FIRSTNAME: contact.firstName || '',
          LASTNAME: contact.lastName || '',
          SIGNUP_DATE: new Date().toISOString(),
          SOURCE: 'website_signup',
          ...contact.attributes
        },
        listIds: [listIdNumber],
        updateEnabled: true
      }

      // Make the API request
      const response = await fetch(`${this.BREVO_API_BASE}/contacts`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const data = await response.json()
        console.log(`Contact added successfully: ${contact.email}`)
        return { 
          success: true, 
          message: 'Successfully subscribed to newsletter',
          id: data.id 
        }
      } else if (response.status === 400) {
        // Check if contact already exists
        const errorData = await response.json().catch(() => null)
        if (errorData?.code === 'duplicate_parameter') {
          // Contact already exists, try to update
          return await this.updateContact(contact)
        }
        
        console.error('Bad request to Brevo API:', errorData)
        return { 
          success: false, 
          message: 'Invalid subscription request' 
        }
      } else {
        const errorText = await response.text()
        console.error(`Brevo API error (${response.status}):`, errorText)
        return { 
          success: false, 
          message: 'Failed to subscribe to newsletter' 
        }
      }
    } catch (error) {
      console.error('Error adding contact to Brevo:', error)
      return { 
        success: false, 
        message: 'Network error occurred' 
      }
    }
  }

  /**
   * Update an existing contact
   */
  private static async updateContact(contact: BrevoContact): Promise<BrevoResponse> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      const listId = process.env.BREVO_LIST_ID

      if (!apiKey || !listId) {
        return { success: false, message: 'API configuration missing' }
      }

      const listIdNumber = parseInt(listId, 10)
      const payload = {
        attributes: {
          FIRSTNAME: contact.firstName || '',
          LASTNAME: contact.lastName || '',
          LAST_UPDATE: new Date().toISOString(),
          ...contact.attributes
        },
        listIds: [listIdNumber]
      }

      const response = await fetch(`${this.BREVO_API_BASE}/contacts/${encodeURIComponent(contact.email)}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        console.log(`Contact updated successfully: ${contact.email}`)
        return { 
          success: true, 
          message: 'Successfully updated subscription' 
        }
      } else {
        const errorText = await response.text()
        console.error(`Failed to update contact:`, errorText)
        return { 
          success: false, 
          message: 'Failed to update subscription' 
        }
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      return { 
        success: false, 
        message: 'Failed to update subscription' 
      }
    }
  }

  /**
   * Test the Brevo API connection
   */
  static async testConnection(): Promise<boolean> {
    try {
      const apiKey = process.env.BREVO_API_KEY
      
      if (!apiKey) {
        console.error('BREVO_API_KEY not configured')
        return false
      }

      const response = await fetch(`${this.BREVO_API_BASE}/account`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'api-key': apiKey,
        }
      })

      return response.ok
    } catch (error) {
      console.error('Brevo connection test failed:', error)
      return false
    }
  }
}