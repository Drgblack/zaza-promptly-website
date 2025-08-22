import { capture } from '../../../lib/obs'

export async function POST(req: Request) {
  try {
    const { subject, level, tone, length } = await req.json();
    
    const text = [
      `Subject: ${subject || 'General'}`,
      `Level: ${level || 'Secondary'}`,
      `Tone: ${tone || 'Supportive'}`,
      '',
      (length === 'Long'
        ? `This student demonstrates notable progress in ${subject || 'their studies'}. They increasingly apply key concepts with accuracy and show developing confidence in tackling more complex problems. Their written work reflects thoughtful engagement with the material, though there are still opportunities to deepen analytical thinking. I encourage them to continue building on this solid foundation by seeking feedback and taking on additional challenges that will further develop their skills and understanding.`
        : length === 'Medium'
        ? `Showing steady progress in ${subject || 'their studies'}; applying core ideas with improving consistency. Written work demonstrates good understanding of fundamental concepts, with some evidence of independent thinking. Areas for development include strengthening analytical skills and connecting ideas more effectively. Continue practising key skills and engaging actively in discussions.`
        : `Good progress in ${subject || 'this subject'}; continue practising core concepts and reflect on feedback. Shows understanding of basic principles with room to develop deeper analysis. Keep working on written communication and ask questions when unsure.`)
    ].join('\n');
    
    return Response.json({ ok: true, text });
  } catch (error) {
    console.error('Generate comment error:', error)
    capture(error, { 
      endpoint: '/api/generate',
      userAgent: req.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    })
    return Response.json(
      { ok: false, error: 'Failed to generate comment' },
      { status: 500 }
    )
  }
}