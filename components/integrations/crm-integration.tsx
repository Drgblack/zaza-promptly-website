"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Building, 
  Star, 
  MessageSquare, 
  FileText, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Sync,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react"

interface Contact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  position?: string
  status: "lead" | "prospect" | "customer" | "inactive"
  source: string
  lastContact?: string
  notes?: string
  tags: string[]
  leadScore: number
  createdAt: string
  updatedAt: string
}

interface Interaction {
  id: string
  contactId: string
  type: "email" | "call" | "meeting" | "note"
  subject: string
  description: string
  date: string
  outcome?: string
  nextAction?: string
  nextActionDate?: string
}

interface CRMIntegrationProps {
  onContactUpdate?: (contact: Contact) => void
  onInteractionAdd?: (interaction: Interaction) => void
  onSync?: () => void
}

const mockContacts: Contact[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@school.edu",
    phone: "+1 (555) 123-4567",
    company: "Lincoln Elementary School",
    position: "3rd Grade Teacher",
    status: "customer",
    source: "Website Signup",
    lastContact: "2024-01-15",
    notes: "Very interested in AI tools for lesson planning",
    tags: ["Elementary", "Technology Enthusiast", "Early Adopter"],
    leadScore: 85,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: "2",
    firstName: "Michael",
    lastName: "Chen",
    email: "mchen@highschool.edu",
    phone: "+1 (555) 234-5678",
    company: "Riverside High School",
    position: "English Department Head",
    status: "prospect",
    source: "Email Campaign",
    lastContact: "2024-01-10",
    notes: "Interested in department-wide implementation",
    tags: ["High School", "Department Head", "Budget Conscious"],
    leadScore: 72,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10"
  },
  {
    id: "3",
    firstName: "Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@district.edu",
    phone: "+1 (555) 345-6789",
    company: "Springfield School District",
    position: "Curriculum Director",
    status: "lead",
    source: "Conference",
    lastContact: "2024-01-08",
    notes: "Looking for district-wide solution",
    tags: ["District Level", "Decision Maker", "Large Organization"],
    leadScore: 95,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-08"
  }
]

const mockInteractions: Interaction[] = [
  {
    id: "1",
    contactId: "1",
    type: "email",
    subject: "Welcome to Zaza Promptly",
    description: "Sent welcome email with getting started guide",
    date: "2024-01-15",
    outcome: "Positive response",
    nextAction: "Follow up on usage",
    nextActionDate: "2024-01-22"
  },
  {
    id: "2",
    contactId: "2",
    type: "call",
    subject: "Product Demo",
    description: "Scheduled 30-minute demo for English department",
    date: "2024-01-10",
    outcome: "Demo scheduled",
    nextAction: "Send demo materials",
    nextActionDate: "2024-01-12"
  },
  {
    id: "3",
    contactId: "3",
    type: "meeting",
    subject: "District Implementation Discussion",
    description: "Met at education conference to discuss district needs",
    date: "2024-01-08",
    outcome: "Initial interest confirmed",
    nextAction: "Send proposal",
    nextActionDate: "2024-01-15"
  }
]

export function CRMIntegration({ onContactUpdate, onInteractionAdd, onSync }: CRMIntegrationProps) {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showAddContact, setShowAddContact] = useState(false)
  const [showAddInteraction, setShowAddInteraction] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "lead": return "bg-blue-100 text-blue-800"
      case "prospect": return "bg-yellow-100 text-yellow-800"
      case "customer": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getLeadScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      onSync?.()
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
  }

  const getContactInteractions = (contactId: string) => {
    return interactions.filter(interaction => interaction.contactId === contactId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Relationship Management</h2>
          <p className="text-gray-600">Manage your contacts and track interactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2"
          >
            <Sync className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync'}
          </Button>
          <Button
            onClick={() => setShowAddContact(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="lead">Leads</SelectItem>
            <SelectItem value="prospect">Prospects</SelectItem>
            <SelectItem value="customer">Customers</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Contacts ({filteredContacts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedContact?.id === contact.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">
                          {contact.firstName} {contact.lastName}
                        </h4>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        {contact.company && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Building className="w-3 h-3" />
                            {contact.company}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge className={getStatusColor(contact.status)}>
                          {contact.status}
                        </Badge>
                        <div className={`text-sm font-medium ${getLeadScoreColor(contact.leadScore)}`}>
                          Score: {contact.leadScore}
                        </div>
                      </div>
                    </div>
                    {contact.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {contact.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {contact.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{contact.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {selectedContact.firstName} {selectedContact.lastName}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddInteraction(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Interaction
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Send Email
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Email</Label>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          {selectedContact.email}
                        </p>
                      </div>
                      {selectedContact.phone && (
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Phone</Label>
                          <p className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            {selectedContact.phone}
                          </p>
                        </div>
                      )}
                      {selectedContact.company && (
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Company</Label>
                          <p className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400" />
                            {selectedContact.company}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <Badge className={getStatusColor(selectedContact.status)}>
                          {selectedContact.status}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Lead Score</Label>
                        <p className={`font-medium ${getLeadScoreColor(selectedContact.leadScore)}`}>
                          {selectedContact.leadScore}/100
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Source</Label>
                        <p>{selectedContact.source}</p>
                      </div>
                      {selectedContact.lastContact && (
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Last Contact</Label>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {new Date(selectedContact.lastContact).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {selectedContact.notes && (
                    <div className="mt-4">
                      <Label className="text-sm font-medium text-gray-600">Notes</Label>
                      <p className="mt-1 text-sm">{selectedContact.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Interactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getContactInteractions(selectedContact.id).map((interaction) => (
                      <div key={interaction.id} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{interaction.subject}</h4>
                            <p className="text-sm text-gray-600 mt-1">{interaction.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(interaction.date).toLocaleDateString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {interaction.type}
                              </Badge>
                            </div>
                          </div>
                          {interaction.outcome && (
                            <Badge className="bg-green-100 text-green-800">
                              {interaction.outcome}
                            </Badge>
                          )}
                        </div>
                        {interaction.nextAction && (
                          <div className="mt-2 p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                            <p className="text-sm">
                              <strong>Next Action:</strong> {interaction.nextAction}
                              {interaction.nextActionDate && (
                                <span className="ml-2 text-gray-600">
                                  (Due: {new Date(interaction.nextActionDate).toLocaleDateString()})
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a contact to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContact} onOpenChange={setShowAddContact}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Add a new contact to your CRM system
            </DialogDescription>
          </DialogHeader>
          {/* Add contact form would go here */}
        </DialogContent>
      </Dialog>

      {/* Add Interaction Dialog */}
      <Dialog open={showAddInteraction} onOpenChange={setShowAddInteraction}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add Interaction</DialogTitle>
            <DialogDescription>
              Record a new interaction with {selectedContact?.firstName} {selectedContact?.lastName}
            </DialogDescription>
          </DialogHeader>
          {/* Add interaction form would go here */}
        </DialogContent>
      </Dialog>
    </div>
  )
}
