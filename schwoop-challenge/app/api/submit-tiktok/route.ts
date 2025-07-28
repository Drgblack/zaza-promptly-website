import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    // Validate that URL exists
    if (!url) {
      return NextResponse.json({ error: "TikTok URL is required" }, { status: 400 })
    }

    // Validate TikTok URL format
    const tiktokRegex = /^https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\/.+/
    if (!tiktokRegex.test(url)) {
      return NextResponse.json({ error: "Invalid TikTok URL" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Process the TikTok URL here
    console.log("Processing TikTok URL:", url)

    // In a real app, you would:
    // 1. Save to database
    // 2. Queue for processing
    // 3. Send notifications
    // 4. Validate the URL actually exists

    return NextResponse.json({
      success: true,
      message: "TikTok link submitted successfully",
      submittedUrl: url,
    })
  } catch (error) {
    console.error("Error processing TikTok submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
