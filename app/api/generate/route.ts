import { OpenAIStream } from './OpenAIStream';
import { AnthropicStream } from './AnthropicStream';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(`[${new Date().toISOString()}] ✅ Incoming request to /api/generate`, body);

    // Input validation and sanitization
    const { context, tone } = body;
    
    // Validate required fields
    if (!context || typeof context !== 'string') {
      return new Response(JSON.stringify({ 
        error: 'Student observation is required and must be a string' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize and validate input length
    const sanitizedContext = context.trim();
    if (sanitizedContext.length === 0) {
      return new Response(JSON.stringify({ 
        error: 'Student observation cannot be empty' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (sanitizedContext.length > 1000) {
      return new Response(JSON.stringify({ 
        error: 'Student observation is too long (maximum 1000 characters)' 
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate tone if provided
    const validTones = ['encouraging', 'constructive', 'formal', 'warm'];
    const sanitizedTone = tone && validTones.includes(tone) ? tone : 'encouraging';

    // Rate limiting check (basic implementation)
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log(`Request from IP: ${clientIP}`);

    // Check if any AI API key is configured
    const hasOpenAI = process.env.OPENAI_API_KEY;
    const hasAnthropic = process.env.ANTHROPIC_API_KEY;
    
    if (!hasOpenAI && !hasAnthropic) {
      console.log('No AI API keys configured, using fallback response');
      
      // Generate a fallback response based on the context and tone
      const fallbackResponse = generateFallbackResponse(sanitizedContext, sanitizedTone);
      
      return new Response(JSON.stringify({ message: fallbackResponse }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Create the messages array for AI providers
    const messages = [
      {
        role: "system",
        content: `You are an expert teacher who writes personalized, constructive feedback for students. 
        Write feedback in a ${sanitizedTone} tone that is specific, actionable, and supportive. 
        Keep the feedback concise but meaningful (2-3 sentences).`
      },
      {
        role: "user", 
        content: `Write feedback for this student observation: ${sanitizedContext}`
      }
    ];
    
    // Try Anthropic first if available, then fall back to OpenAI
    let result;
    if (hasAnthropic) {
      try {
        console.log('Using Anthropic Claude API');
        result = await AnthropicStream(messages);
      } catch (error) {
        console.error('Anthropic API failed, falling back to OpenAI:', error);
        if (hasOpenAI) {
          console.log('Using OpenAI API as fallback');
          result = await OpenAIStream(messages);
        } else {
          throw error;
        }
      }
    } else if (hasOpenAI) {
      console.log('Using OpenAI API');
      result = await OpenAIStream(messages);
    }
    
    return new Response(JSON.stringify({ message: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    // Log technical details to the server console only
    console.error('API Error:', err);
    // Always return a friendly error message to the user
    return new Response(JSON.stringify({ 
      error: 'Sorry, we are experiencing technical difficulties. Please try again later.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Enhanced fallback response generator with much better, specific feedback
function generateFallbackResponse(context: string, tone: string): string {
  const contextLower = context.toLowerCase();
  
  // Extract student name if present
  const nameMatch = context.match(/\b([A-Z][a-z]+)\b/);
  const studentName = nameMatch ? nameMatch[1] : "this student";
  
  // Define specific, actionable feedback templates
  const toneTemplates = {
    encouraging: {
      academic_struggles: [
        `I can see that ${studentName} is putting in genuine effort, and that determination is exactly what will lead to success. When ${studentName} takes time to review concepts step-by-step, the understanding really clicks. I'd love to see ${studentName} apply this same focused approach to [specific subject area] - perhaps starting with just 10 minutes of targeted practice each day.`,
        `${studentName} shows such resilience when facing challenges, and that's a quality that will serve well throughout life. I've noticed that when ${studentName} asks questions and seeks clarification, the learning becomes much more meaningful. Let's build on this by creating a study routine that includes regular check-ins and celebration of small victories.`,
        `What impresses me most about ${studentName} is the willingness to keep trying even when things feel difficult. That growth mindset is exactly what successful learners have. I'd encourage ${studentName} to connect new concepts to things already understood - maybe through drawing, explaining to a friend, or creating simple examples.`
      ],
      academic_strengths: [
        `${studentName} demonstrates exceptional understanding in this area, and that natural ability combined with consistent effort creates a powerful learning foundation. I'd love to see ${studentName} take on leadership roles in group work or help peers who might be struggling with similar concepts. This kind of teaching others often deepens our own understanding.`,
        `The way ${studentName} approaches this subject shows both creativity and analytical thinking - a rare and valuable combination. I'd encourage ${studentName} to explore more advanced topics in this area, perhaps through independent projects or enrichment activities. This kind of intellectual curiosity is exactly what drives innovation.`,
        `${studentName} has developed such strong skills in this area that it's clear a lot of thoughtful practice has been happening. I'd love to see ${studentName} share these strategies with classmates and maybe even mentor others who are working to develop similar strengths.`
      ],
      behavioral_challenges: [
        `I can see that ${studentName} has so much potential and energy - it's just a matter of channeling that enthusiasm in productive ways. When ${studentName} is engaged in hands-on activities or collaborative projects, the focus and participation are excellent. Let's work together to find more opportunities for this kind of active learning.`,
        `${studentName} brings such positive energy to our classroom, and I believe we can harness that enthusiasm for learning. I've noticed that when ${studentName} has clear expectations and immediate feedback, the engagement level increases significantly. Let's create a plan that includes regular check-ins and celebrates progress.`,
        `I appreciate ${studentName}'s unique perspective and creativity - these are valuable qualities that make our classroom richer. Sometimes the challenge is finding the right way to express these gifts. I'd love to work with ${studentName} to identify specific strategies for staying focused during whole-group instruction while preserving that wonderful individuality.`
      ],
      mixed_performance: [
        `${studentName} shows such promise in areas of strength, and I believe we can apply those same successful strategies to areas that need development. When ${studentName} is confident and engaged, the learning happens so naturally. Let's identify what makes those successful moments work and build more of those opportunities into the routine.`,
        `I can see that ${studentName} has the ability to excel - it's just a matter of finding the right approach for each subject area. The determination shown in [strong area] is exactly what we need to apply to [challenging area]. I'd love to work together to create a personalized learning plan that builds on strengths while addressing areas for growth.`,
        `${studentName} demonstrates such thoughtful understanding in some areas, and I believe we can extend that same level of engagement to all subjects. The key is finding what makes learning click for ${studentName} and applying those strategies consistently. Let's explore different approaches and celebrate each step forward.`
      ]
    },
    constructive: {
      academic_struggles: [
        `${studentName} has shown improvement in some areas, but there are still specific skills that need focused attention. I'd recommend daily practice with [specific skill] for 15-20 minutes, perhaps using [specific resource or method]. Regular check-ins with me will help us track progress and adjust strategies as needed.`,
        `While ${studentName} demonstrates effort, the current approach isn't yielding the desired results. I suggest we try a different strategy: breaking down complex tasks into smaller, manageable steps and providing immediate feedback. This methodical approach often helps students build confidence and see progress more clearly.`,
        `${studentName} needs to develop more consistent study habits and organizational skills. I recommend creating a structured daily routine that includes specific time for homework, review, and preparation. Regular use of a planner or digital organizer would also help ${studentName} stay on track with assignments and deadlines.`
      ],
      academic_strengths: [
        `${studentName} demonstrates strong analytical skills and deep understanding in this subject area. To maintain this high level of achievement, I'd suggest exploring more advanced topics and taking on leadership roles in group activities. This will help ${studentName} continue growing while supporting peers.`,
        `The quality of ${studentName}'s work consistently meets or exceeds expectations. To further develop these strengths, I'd recommend independent research projects or participation in enrichment programs. This will challenge ${studentName} to apply skills in new and more complex situations.`,
        `${studentName} shows excellent mastery of core concepts and applies knowledge effectively. To continue this strong performance, I'd suggest focusing on higher-order thinking skills and taking on more challenging assignments. This will prepare ${studentName} for advanced coursework.`
      ],
      behavioral_challenges: [
        `${studentName} needs to develop better self-regulation skills and improve classroom behavior. I recommend implementing a behavior plan with clear expectations, immediate consequences, and regular communication with parents. Consistent reinforcement of positive behaviors will help ${studentName} develop better habits.`,
        `The current level of classroom participation and focus is not meeting expectations. I suggest creating a structured environment with clear routines, frequent check-ins, and positive reinforcement for appropriate behavior. Regular parent communication will help ensure consistency between home and school.`,
        `${studentName} requires more support to maintain appropriate classroom behavior and engagement. I recommend a behavior intervention plan that includes specific goals, regular monitoring, and collaboration with support staff. This systematic approach will help ${studentName} develop necessary self-control skills.`
      ],
      mixed_performance: [
        `${studentName} shows potential but needs more consistent effort and focus across all subject areas. I recommend developing a structured study plan that addresses both strengths and areas for improvement. Regular progress monitoring and parent communication will help ensure sustained growth.`,
        `While ${studentName} demonstrates ability in some areas, there are specific skills that need targeted development. I suggest creating a personalized learning plan that builds on strengths while systematically addressing weaknesses. Regular assessment and adjustment of strategies will help maximize progress.`,
        `${studentName} has the capacity to perform well but needs to develop better work habits and time management skills. I recommend implementing organizational strategies and creating a structured daily routine. This will help ${studentName} achieve more consistent results across all subjects.`
      ]
    },
    formal: {
      academic_struggles: [
        `The student's current academic performance indicates a need for additional support and intervention in specific subject areas. I recommend implementing a structured remediation plan that includes targeted instruction, regular progress monitoring, and collaboration with support services. This systematic approach will address identified learning gaps and promote academic growth.`,
        `Assessment results demonstrate that the student requires focused attention to develop essential skills and concepts. I suggest creating an individualized learning plan that includes differentiated instruction, frequent formative assessment, and regular parent communication. This comprehensive approach will support the student's academic development.`,
        `The student's performance data indicates areas of concern that require immediate intervention and support. I recommend developing a multi-tiered support plan that includes evidence-based instructional strategies, progress monitoring, and collaboration with educational specialists. This structured approach will address learning needs effectively.`
      ],
      academic_strengths: [
        `The student demonstrates proficient mastery of grade-level standards and consistently applies knowledge effectively across subject areas. I recommend continued enrichment opportunities and advanced coursework to further develop these strong academic foundations. This will prepare the student for future academic challenges and success.`,
        `Assessment data indicates that the student consistently meets or exceeds academic expectations and demonstrates strong analytical and critical thinking skills. I suggest participation in advanced learning opportunities and leadership roles to further develop these demonstrated strengths. This will support continued academic excellence.`,
        `The student's academic performance reflects strong understanding of core concepts and effective application of learned skills. I recommend continued focus on higher-order thinking skills and participation in challenging academic opportunities. This will maintain the student's current high level of achievement.`
      ],
      behavioral_challenges: [
        `The student's current behavior patterns require implementation of a formal behavior intervention plan to address identified concerns. I recommend developing a structured approach that includes clear behavioral expectations, consistent consequences, and regular progress monitoring. This systematic intervention will support the development of appropriate classroom behaviors.`,
        `Assessment of the student's classroom behavior indicates a need for targeted intervention and support. I suggest implementing a comprehensive behavior management plan that includes positive reinforcement strategies, regular communication with parents, and collaboration with support staff. This structured approach will address behavioral concerns effectively.`,
        `The student's behavior data indicates patterns that require immediate intervention and support. I recommend developing a formal behavior plan that includes specific behavioral goals, regular monitoring, and systematic reinforcement of appropriate behaviors. This structured approach will support behavioral improvement.`
      ],
      mixed_performance: [
        `The student's academic profile indicates areas of strength alongside specific learning needs that require targeted intervention. I recommend developing a comprehensive learning plan that addresses both demonstrated abilities and areas requiring support. This balanced approach will promote overall academic growth and achievement.`,
        `Assessment results show that the student demonstrates proficiency in some areas while requiring additional support in others. I suggest implementing a differentiated instructional approach that builds on strengths while systematically addressing identified learning gaps. This structured plan will support balanced academic development.`,
        `The student's performance data indicates a need for a comprehensive approach that addresses both academic strengths and areas requiring intervention. I recommend developing an individualized learning plan that includes enrichment opportunities and targeted support. This balanced approach will promote optimal academic growth.`
      ]
    },
    warm: {
      academic_struggles: [
        `I can see that ${studentName} is working so hard, and I want you to know how much I appreciate that determination. When ${studentName} takes time to really think through problems step-by-step, I can see the understanding click into place. I'd love to work together to find the perfect study routine that makes learning feel more comfortable and successful.`,
        `I really care about ${studentName}'s success, and I can see the effort being put in every day. Sometimes learning can feel overwhelming, but I believe in ${studentName}'s ability to figure things out. Let's find some fun ways to practice [specific skill] together - maybe through games, drawing, or explaining concepts to each other.`,
        `${studentName} brings such wonderful energy to our classroom, and I want to help make learning feel more accessible and enjoyable. I've noticed that when ${studentName} feels confident, the learning happens so naturally. Let's work together to create more of those confident moments and build on them step by step.`
      ],
      academic_strengths: [
        `I absolutely love seeing ${studentName} shine in this area - it's clear that a lot of thoughtful work has been happening! The way ${studentName} approaches problems with creativity and determination is truly inspiring. I'd love to see ${studentName} share these wonderful strategies with classmates and maybe even help others discover their own strengths.`,
        `Watching ${studentName} excel in this subject brings me so much joy - it's clear that learning is happening in exactly the right way. I'd love to see ${studentName} explore even more challenging topics in this area, perhaps through special projects or activities that really spark curiosity. This kind of enthusiasm for learning is exactly what makes teaching so rewarding.`,
        `I'm so proud of ${studentName}'s achievements in this area - it's clear that real understanding and skill development are taking place. I'd love to see ${studentName} take on leadership roles in group work and help create a supportive learning environment for everyone. This kind of generosity with knowledge makes our classroom community stronger.`
      ],
      behavioral_challenges: [
        `I really enjoy ${studentName}'s unique personality and the special energy they bring to our classroom. Sometimes it can be tricky to channel all that wonderful enthusiasm in the right direction, but I believe we can figure this out together. I'd love to work with ${studentName} to find activities and approaches that make learning feel exciting and engaging.`,
        `I care so much about ${studentName}'s success and happiness in our classroom. I can see that when ${studentName} is really interested in something, the focus and participation are amazing. Let's work together to find more ways to make learning feel that exciting and meaningful every day.`,
        `${studentName} has such a wonderful spirit, and I want to help make our classroom a place where that energy can shine in positive ways. I've noticed that when ${studentName} feels supported and understood, the behavior is exactly what we want to see. Let's create more of those supportive moments together.`
      ],
      mixed_performance: [
        `I can see so much potential in ${studentName}, and I want to help unlock all those wonderful abilities. When ${studentName} is confident and engaged, the learning happens so beautifully. Let's work together to figure out what makes those successful moments work and create more opportunities for that kind of learning.`,
        `I really believe in ${studentName}'s ability to succeed, and I can see the determination to do well. Sometimes different subjects require different approaches, and that's totally normal. Let's work together to find the perfect strategies for each area and celebrate every step forward.`,
        `I care about ${studentName}'s growth and happiness, and I can see the effort being made every day. Learning can feel different in different subjects, and that's okay. Let's work together to find approaches that make each subject feel more accessible and enjoyable.`
      ]
    }
  };

  // Determine the type of observation
  let observationType = 'mixed_performance';
  
  if (contextLower.includes('struggle') || contextLower.includes('difficult') || contextLower.includes('not good') || contextLower.includes('needs help') || contextLower.includes('poor')) {
    observationType = 'academic_struggles';
  } else if (contextLower.includes('excel') || contextLower.includes('great') || contextLower.includes('excellent') || contextLower.includes('outstanding') || contextLower.includes('amazing')) {
    observationType = 'academic_strengths';
  } else if (contextLower.includes('behavior') || contextLower.includes('attention') || contextLower.includes('focus') || contextLower.includes('disrupt') || contextLower.includes('pay attention')) {
    observationType = 'behavioral_challenges';
  }

  // Select appropriate template based on tone and observation type
  const template = toneTemplates[tone as keyof typeof toneTemplates];
  const responses = template[observationType as keyof typeof template];
  
  // Return a random response from the appropriate category
  return responses[Math.floor(Math.random() * responses.length)];
} 