// Email Automation Sequences for Zaza Promptly
// Integrated with Brevo for automated email marketing

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  delay: number; // Hours after signup/trigger
  tags: string[];
  conditions?: {
    hasName?: boolean;
    isTeacher?: boolean;
    hasTriedDemo?: boolean;
    utmSource?: string[];
  };
}

export interface EmailSequence {
  id: string;
  name: string;
  description: string;
  triggerTags: string[];
  emails: EmailTemplate[];
}

// Email sequences as defined in the requirements
export const EMAIL_SEQUENCES: Record<string, EmailSequence> = {
  promptly_interest: {
    id: 'promptly_interest',
    name: 'Promptly Interest Welcome Sequence',
    description: '3-email sequence for general Promptly signups',
    triggerTags: ['promptly_interest', 'newsletter_signup'],
    emails: [
      {
        id: 'promptly_welcome',
        name: 'Welcome Email',
        subject: 'Welcome to Zaza Promptly! Your AI Teaching Assistant Awaits 🎉',
        delay: 0, // Immediate
        tags: ['welcome', 'promptly'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Zaza Promptly! 🎉</h1>
            <p style="color: #f3e8ff; margin: 10px 0 0 0; font-size: 16px;">Your AI teaching assistant is ready to save you hours</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <h2 style="color: #374151; margin-bottom: 20px;">Quick Win: Transform Any Comment in 10 Seconds</h2>
            
            <p>Hi there!</p>
            
            <p>I'm Dr. Greg Blackburn, the PhD educator behind Zaza Promptly. I built this tool because, like you, I was drowning in marking and parent communications.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #7c3aed;">Try This Now (30 seconds):</h3>
              <p><strong>Original:</strong> "Good work on math test"</p>
              <p><strong>AI Transform:</strong> "Great progress on your recent mathematics assessment! Your methodical approach to problem-solving really shows growth in logical thinking. Keep up the excellent effort - I can see your confidence building with each lesson."</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://zazapromptly.com/?utm_source=email&utm_medium=welcome&utm_campaign=promptly_interest" 
                 style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Transform Your First Comment →
              </a>
            </div>
            
            <p><strong>What makes this different from ChatGPT?</strong></p>
            <ul>
              <li>✅ Built specifically for teachers by a PhD educator</li>
              <li>✅ Templates designed for school-appropriate language</li>
              <li>✅ Safe from hallucinations with education-focused training</li>
              <li>✅ GDPR compliant and privacy-focused</li>
            </ul>
            
            <p>Hit reply if you have questions - I read every response personally.</p>
            
            <p>Best regards,<br>
            Dr. Greg Blackburn<br>
            <em>Founder, Zaza Promptly</em></p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Zaza Promptly | Built by teachers, for teachers</p>
          </div>
        </div>`,
        textContent: `Welcome to Zaza Promptly! 🎉

Hi there!

I'm Dr. Greg Blackburn, the PhD educator behind Zaza Promptly. I built this tool because, like you, I was drowning in marking and parent communications.

Quick Win: Transform Any Comment in 10 Seconds

Try This Now (30 seconds):
Original: "Good work on math test"
AI Transform: "Great progress on your recent mathematics assessment! Your methodical approach to problem-solving really shows growth in logical thinking. Keep up the excellent effort - I can see your confidence building with each lesson."

What makes this different from ChatGPT?
✅ Built specifically for teachers by a PhD educator
✅ Templates designed for school-appropriate language  
✅ Safe from hallucinations with education-focused training
✅ GDPR compliant and privacy-focused

Transform your first comment: https://zazapromptly.com/?utm_source=email&utm_medium=welcome&utm_campaign=promptly_interest

Hit reply if you have questions - I read every response personally.

Best regards,
Dr. Greg Blackburn
Founder, Zaza Promptly

---
Zaza Promptly | Built by teachers, for teachers`
      },
      {
        id: 'promptly_pedagogy',
        name: 'How Promptly Differs from ChatGPT',
        subject: 'Why Teachers Choose Promptly Over ChatGPT (Safety + Pedagogy)',
        delay: 48, // 2 days
        tags: ['education', 'comparison'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: #1f2937; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">The PhD Educator's Perspective</h1>
            <p style="color: #d1d5db; margin: 10px 0 0 0;">Why Promptly beats ChatGPT for classroom use</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>Yesterday I received this email from Sarah, a Year 6 teacher:</p>
            
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; font-style: italic;">
              "I tried ChatGPT for parent emails but got nervous about accuracy. One response suggested a disciplinary approach that didn't match our school's restorative justice policy. I need something built FOR education, not just adapted to it."
            </div>
            
            <p>Sarah's concern is exactly why I spent 2 years building Promptly with educational psychology at its core.</p>
            
            <h3 style="color: #7c3aed; margin-top: 30px;">The Critical Differences:</h3>
            
            <div style="display: grid; gap: 20px; margin: 25px 0;">
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0;">
                <h4 style="margin-top: 0; color: #166534;">🎯 Educational Psychology Built-In</h4>
                <p style="margin-bottom: 0;">Promptly understands developmental stages, learning differences, and appropriate communication frameworks. ChatGPT doesn't.</p>
              </div>
              
              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe;">
                <h4 style="margin-top: 0; color: #1e40af;">🛡️ Safety-First Design</h4>
                <p style="margin-bottom: 0;">Every template is reviewed for school policy compliance. No suggestions for punishment, no inappropriate language, no legal landmines.</p>
              </div>
              
              <div style="background: #fef7ff; padding: 20px; border-radius: 8px; border: 1px solid #e879f9;">
                <h4 style="margin-top: 0; color: #a21caf;">📚 Teacher Tone Mastery</h4>
                <p style="margin-bottom: 0;">Trained specifically on professional educational communication. Maintains authority while being approachable - something generic AI struggles with.</p>
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #7c3aed; margin: 30px 0;">
              <h4 style="margin-top: 0; color: #7c3aed;">Live Demo: See The Difference</h4>
              <p>Watch me transform a challenging parent email in real-time, showing exactly how Promptly's educational training creates more effective, safer communications.</p>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="https://zazapromptly.com/demo?utm_source=email&utm_medium=sequence&utm_campaign=pedagogy_demo" 
                   style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Watch 3-Minute Demo →
                </a>
              </div>
            </div>
            
            <p><strong>Tomorrow's email:</strong> I'll show you case studies from our teacher community - real examples of time saved and stress reduced.</p>
            
            <p>Still have questions? Just hit reply.</p>
            
            <p>Best,<br>Dr. Greg</p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Zaza Promptly | Educational AI by PhD educator</p>
          </div>
        </div>`,
        textContent: `The PhD Educator's Perspective: Why Promptly beats ChatGPT for classroom use

Yesterday I received this email from Sarah, a Year 6 teacher:

"I tried ChatGPT for parent emails but got nervous about accuracy. One response suggested a disciplinary approach that didn't match our school's restorative justice policy. I need something built FOR education, not just adapted to it."

Sarah's concern is exactly why I spent 2 years building Promptly with educational psychology at its core.

The Critical Differences:

🎯 Educational Psychology Built-In
Promptly understands developmental stages, learning differences, and appropriate communication frameworks. ChatGPT doesn't.

🛡️ Safety-First Design  
Every template is reviewed for school policy compliance. No suggestions for punishment, no inappropriate language, no legal landmines.

📚 Teacher Tone Mastery
Trained specifically on professional educational communication. Maintains authority while being approachable - something generic AI struggles with.

Live Demo: See The Difference
Watch me transform a challenging parent email in real-time, showing exactly how Promptly's educational training creates more effective, safer communications.

Watch demo: https://zazapromptly.com/demo?utm_source=email&utm_medium=sequence&utm_campaign=pedagogy_demo

Tomorrow's email: I'll show you case studies from our teacher community - real examples of time saved and stress reduced.

Still have questions? Just hit reply.

Best,
Dr. Greg

---
Zaza Promptly | Educational AI by PhD educator`
      },
      {
        id: 'promptly_demo_case_studies',
        name: 'Teacher Success Stories + Demo',
        subject: 'How Emma Saves 6 Hours Weekly (+ Try Live Demo)',
        delay: 96, // 4 days
        tags: ['demo', 'case_study'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0d9488 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Teacher Success Stories</h1>
            <p style="color: #a7f3d0; margin: 10px 0 0 0;">Real results from our community</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-bottom: 25px;">
              <h3 style="margin-top: 0; color: #0369a1;">"I Got My Evenings Back" - Emma, Primary Teacher</h3>
              <p>"Before Promptly, I spent 2-3 hours each evening writing parent emails and report comments. Now? 20 minutes max. The AI captures my teaching voice perfectly, and parents have commented on how 'thoughtful and detailed' my communications have become."</p>
              <p style="margin-bottom: 0;"><strong>Time saved: 6+ hours weekly</strong></p>
            </div>
            
            <div style="background: #fefce8; padding: 20px; border-radius: 8px; border-left: 4px solid #eab308; margin-bottom: 25px;">
              <h3 style="margin-top: 0; color: #a16207;">"Reduced My Stress by 80%" - James, Secondary HOD</h3>
              <p>"The most challenging part of my job was communicating with difficult parents. Promptly helps me stay professional and educational while addressing concerns. My admin team is impressed with the consistency and tone."</p>
              <p style="margin-bottom: 0;"><strong>Stress reduction: Significant improvement in work-life balance</strong></p>
            </div>
            
            <div style="background: #fdf4ff; padding: 20px; border-radius: 8px; border-left: 4px solid #d946ef; margin-bottom: 30px;">
              <h3 style="margin-top: 0; color: #a21caf;">"My Students Are More Engaged" - Priya, Year 8 Science</h3>
              <p>"Using Promptly for lesson planning gave me time to focus on creative activities. My lesson objectives are clearer, my differentiation is better planned, and students have noticed the improvement."</p>
              <p style="margin-bottom: 0;"><strong>Impact: Better lessons, happier students</strong></p>
            </div>
            
            <div style="background: #f1f5f9; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h3 style="margin-top: 0; color: #334155;">Ready to Experience This Yourself?</h3>
              <p style="margin-bottom: 20px;">Try our interactive demo with real teaching scenarios:</p>
              
              <div style="margin: 20px 0;">
                <a href="https://zazapromptly.com/demo/parent-email?utm_source=email&utm_medium=sequence&utm_campaign=case_studies" 
                   style="background: #0ea5e9; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 5px;">
                  📧 Parent Email Demo
                </a>
                <a href="https://zazapromptly.com/demo/report-comments?utm_source=email&utm_medium=sequence&utm_campaign=case_studies" 
                   style="background: #059669; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 5px;">
                  📝 Report Comments Demo
                </a>
                <a href="https://zazapromptly.com/demo/lesson-plans?utm_source=email&utm_medium=sequence&utm_campaign=case_studies" 
                   style="background: #7c3aed; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin: 5px;">
                  📚 Lesson Planning Demo
                </a>
              </div>
              
              <p style="color: #64748b; font-size: 14px; margin-top: 15px;">Each demo takes 2-3 minutes and shows real AI outputs</p>
            </div>
            
            <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; margin-top: 30px;">
              <h4 style="color: #374151;">What You Get with Promptly:</h4>
              <ul style="color: #4b5563;">
                <li>✅ 50+ education-specific templates</li>
                <li>✅ GDPR-compliant and privacy-focused</li>
                <li>✅ Works in English, French, German, Spanish</li>
                <li>✅ Integrates with your existing workflow</li>
                <li>✅ Built by PhD educator who understands your challenges</li>
              </ul>
            </div>
            
            <p style="margin-top: 25px;">Questions? Suggestions? Just hit reply - I read every message personally.</p>
            
            <p>Keep teaching brilliantly,<br>
            Dr. Greg Blackburn</p>
            
            <p style="font-size: 14px; color: #6b7280;"><em>P.S. If you're loving these emails but haven't tried the tool yet, you're missing out on the real magic. The demos above take just 2 minutes each!</em></p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Join 12,000+ teachers saving time with AI | Zaza Promptly</p>
          </div>
        </div>`,
        textContent: `Teacher Success Stories: Real results from our community

"I Got My Evenings Back" - Emma, Primary Teacher
"Before Promptly, I spent 2-3 hours each evening writing parent emails and report comments. Now? 20 minutes max. The AI captures my teaching voice perfectly, and parents have commented on how 'thoughtful and detailed' my communications have become."
Time saved: 6+ hours weekly

"Reduced My Stress by 80%" - James, Secondary HOD  
"The most challenging part of my job was communicating with difficult parents. Promptly helps me stay professional and educational while addressing concerns. My admin team is impressed with the consistency and tone."
Stress reduction: Significant improvement in work-life balance

"My Students Are More Engaged" - Priya, Year 8 Science
"Using Promptly for lesson planning gave me time to focus on creative activities. My lesson objectives are clearer, my differentiation is better planned, and students have noticed the improvement."
Impact: Better lessons, happier students

Ready to Experience This Yourself?
Try our interactive demo with real teaching scenarios:

📧 Parent Email Demo: https://zazapromptly.com/demo/parent-email?utm_source=email&utm_medium=sequence&utm_campaign=case_studies
📝 Report Comments Demo: https://zazapromptly.com/demo/report-comments?utm_source=email&utm_medium=sequence&utm_campaign=case_studies  
📚 Lesson Planning Demo: https://zazapromptly.com/demo/lesson-plans?utm_source=email&utm_medium=sequence&utm_campaign=case_studies

Each demo takes 2-3 minutes and shows real AI outputs

What You Get with Promptly:
✅ 50+ education-specific templates
✅ GDPR-compliant and privacy-focused
✅ Works in English, French, German, Spanish
✅ Integrates with your existing workflow
✅ Built by PhD educator who understands your challenges

Questions? Suggestions? Just hit reply - I read every message personally.

Keep teaching brilliantly,
Dr. Greg Blackburn

P.S. If you're loving these emails but haven't tried the tool yet, you're missing out on the real magic. The demos above take just 2 minutes each!

---
Join 12,000+ teachers saving time with AI | Zaza Promptly`
      }
    ]
  },

  teach_waitlist: {
    id: 'teach_waitlist',
    name: 'Zaza Teach Waitlist Sequence',
    description: '3-email sequence for Teach product waitlist signups',
    triggerTags: ['teach_waitlist', 'teach_interest'],
    emails: [
      {
        id: 'teach_welcome',
        name: 'Teach Waitlist Welcome',
        subject: "You're on the Zaza Teach waitlist! Here's what's coming... 📚",
        delay: 0,
        tags: ['waitlist', 'teach'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 26px;">Welcome to the Zaza Teach Waitlist!</h1>
            <p style="color: #bfdbfe; margin: 10px 0 0 0;">Complete lesson planning automation is almost here</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>Thanks for joining the Zaza Teach waitlist! You're among the first teachers to hear about our most ambitious project yet.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">What is Zaza Teach?</h3>
              <p>Complete lesson planning automation that understands your curriculum, your students, and your teaching style. Think of it as having a highly experienced teaching assistant who never gets tired and knows every curriculum standard by heart.</p>
            </div>
            
            <h3 style="color: #7c3aed;">Here's what Zaza Teach will do for you:</h3>
            
            <div style="margin: 25px 0;">
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <span style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">1</span>
                <div>
                  <strong>Curriculum-Aligned Lesson Plans</strong><br>
                  Input your learning objectives, and get complete lesson plans that align perfectly with your national curriculum standards.
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <span style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">2</span>
                <div>
                  <strong>Smart Differentiation</strong><br>
                  Automatically creates activities for different ability levels, learning styles, and support needs in your class.
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <span style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">3</span>
                <div>
                  <strong>Resource Generation</strong><br>
                  Creates worksheets, assessment rubrics, extension activities, and homework assignments - all tailored to your lesson.
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start;">
                <span style="background: #7c3aed; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center; margin-right: 15px; flex-shrink: 0; font-size: 12px; font-weight: bold;">4</span>
                <div>
                  <strong>Assessment Integration</strong><br>
                  Suggests formative assessments during the lesson and creates summative assessment materials that match your teaching approach.
                </div>
              </div>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <h4 style="margin-top: 0; color: #92400e;">Beta Testing Opportunity</h4>
              <p style="margin-bottom: 0;">As a waitlist member, you'll get early access to test Zaza Teach before the public launch. Your feedback will directly shape the final product, and you'll lock in special founding member pricing.</p>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ol>
              <li>I'll keep you updated on development progress with exclusive behind-the-scenes content</li>
              <li>You'll get first access to beta testing (expected: next month)</li>
              <li>You'll receive special pricing as a founding member</li>
            </ol>
            
            <p>In the meantime, you can still save hours with <a href="https://zazapromptly.com/?utm_source=email&utm_medium=teach_waitlist&utm_campaign=cross_sell" style="color: #7c3aed;">Zaza Promptly</a> for your parent communications and student feedback.</p>
            
            <p>Excited to have you on this journey!</p>
            
            <p>Dr. Greg Blackburn<br>
            <em>Founder, Zaza Technologies</em></p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Zaza Teach | Complete lesson planning automation</p>
          </div>
        </div>`,
        textContent: `Welcome to the Zaza Teach Waitlist!

Thanks for joining the Zaza Teach waitlist! You're among the first teachers to hear about our most ambitious project yet.

What is Zaza Teach?
Complete lesson planning automation that understands your curriculum, your students, and your teaching style. Think of it as having a highly experienced teaching assistant who never gets tired and knows every curriculum standard by heart.

Here's what Zaza Teach will do for you:

1. Curriculum-Aligned Lesson Plans
Input your learning objectives, and get complete lesson plans that align perfectly with your national curriculum standards.

2. Smart Differentiation  
Automatically creates activities for different ability levels, learning styles, and support needs in your class.

3. Resource Generation
Creates worksheets, assessment rubrics, extension activities, and homework assignments - all tailored to your lesson.

4. Assessment Integration
Suggests formative assessments during the lesson and creates summative assessment materials that match your teaching approach.

Beta Testing Opportunity
As a waitlist member, you'll get early access to test Zaza Teach before the public launch. Your feedback will directly shape the final product, and you'll lock in special founding member pricing.

What happens next?
1. I'll keep you updated on development progress with exclusive behind-the-scenes content
2. You'll get first access to beta testing (expected: next month)  
3. You'll receive special pricing as a founding member

In the meantime, you can still save hours with Zaza Promptly for your parent communications and student feedback: https://zazapromptly.com/?utm_source=email&utm_medium=teach_waitlist&utm_campaign=cross_sell

Excited to have you on this journey!

Dr. Greg Blackburn
Founder, Zaza Technologies

---
Zaza Teach | Complete lesson planning automation`
      },
      {
        id: 'teach_development_update',
        name: 'Development Progress Update',
        subject: 'Behind the scenes: How Zaza Teach learns your curriculum 🧠',
        delay: 48,
        tags: ['development', 'behind_scenes'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: #1f2937; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Development Update</h1>
            <p style="color: #d1d5db; margin: 10px 0 0 0;">The AI is getting smarter...</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>Quick behind-the-scenes update on Zaza Teach development!</p>
            
            <p>This week my team achieved a major breakthrough: our AI can now understand and adapt to different curriculum frameworks automatically. Here's how it works:</p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #166534;">🎯 Curriculum Intelligence</h3>
              <p>You simply tell Zaza Teach "I'm teaching Year 5 Mathematics, Australian Curriculum" and it instantly knows:</p>
              <ul style="margin-bottom: 0;">
                <li>All relevant learning objectives for your year level</li>
                <li>Prerequisite knowledge students should have</li>
                <li>How this topic connects to next term's learning</li>
                <li>Common misconceptions students face</li>
                <li>Assessment criteria for your specific curriculum</li>
              </ul>
            </div>
            
            <p><strong>But here's the really exciting part...</strong></p>
            
            <p>The AI doesn't just know the curriculum - it understands <em>your teaching context</em>. During setup, you'll answer a few questions about your school, students, and preferences. Then every lesson plan it creates will reflect:</p>
            
            <ul>
              <li>Your school's behavior management approach</li>
              <li>The resources you actually have available</li>
              <li>Your students' backgrounds and interests</li>
              <li>Your preferred teaching methods</li>
              <li>Your assessment and feedback style</li>
            </ul>
            
            <div style="background: #fdf4ff; padding: 20px; border-radius: 8px; border: 1px solid #e879f9; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #a21caf;">Real Example from Beta Testing:</h3>
              <p><strong>Teacher input:</strong> "Year 3 Science - Living Things and their Environment, 45 minutes, mixed ability class, limited outdoor space"</p>
              
              <p><strong>Zaza Teach output:</strong> Complete lesson plan with indoor habitat investigation using classroom materials, differentiated recording sheets for 3 ability levels, formative assessment checkpoints, extension activity for early finishers, and homework that connects to families' home environments.</p>
              
              <p style="margin-bottom: 0;"><strong>Time taken:</strong> 30 seconds</p>
            </div>
            
            <p><strong>Beta testing update:</strong> We're currently testing with 50 teachers across primary and secondary levels. The feedback has been incredible - average time savings of 4-6 hours per week on planning.</p>
            
            <p><strong>Your beta invite is coming soon!</strong> I expect to open the next round of beta testing in 2-3 weeks. You'll get an email with your personal access code.</p>
            
            <p>Questions about the development process? Just hit reply - I love hearing from our waitlist members!</p>
            
            <p>Keep innovating,<br>Dr. Greg</p>
            
            <p style="font-size: 14px; color: #6b7280;"><em>P.S. If you haven't tried Zaza Promptly yet, now's a great time. Many beta testers are using it alongside their planning process to create engaging parent communications about their lessons.</em></p>
          </div>
        </div>`,
        textContent: `Development Update: The AI is getting smarter...

Quick behind-the-scenes update on Zaza Teach development!

This week my team achieved a major breakthrough: our AI can now understand and adapt to different curriculum frameworks automatically. Here's how it works:

🎯 Curriculum Intelligence
You simply tell Zaza Teach "I'm teaching Year 5 Mathematics, Australian Curriculum" and it instantly knows:
• All relevant learning objectives for your year level
• Prerequisite knowledge students should have  
• How this topic connects to next term's learning
• Common misconceptions students face
• Assessment criteria for your specific curriculum

But here's the really exciting part...

The AI doesn't just know the curriculum - it understands your teaching context. During setup, you'll answer a few questions about your school, students, and preferences. Then every lesson plan it creates will reflect:

• Your school's behavior management approach
• The resources you actually have available
• Your students' backgrounds and interests
• Your preferred teaching methods
• Your assessment and feedback style

Real Example from Beta Testing:
Teacher input: "Year 3 Science - Living Things and their Environment, 45 minutes, mixed ability class, limited outdoor space"

Zaza Teach output: Complete lesson plan with indoor habitat investigation using classroom materials, differentiated recording sheets for 3 ability levels, formative assessment checkpoints, extension activity for early finishers, and homework that connects to families' home environments.

Time taken: 30 seconds

Beta testing update: We're currently testing with 50 teachers across primary and secondary levels. The feedback has been incredible - average time savings of 4-6 hours per week on planning.

Your beta invite is coming soon! I expect to open the next round of beta testing in 2-3 weeks. You'll get an email with your personal access code.

Questions about the development process? Just hit reply - I love hearing from our waitlist members!

Keep innovating,
Dr. Greg

P.S. If you haven't tried Zaza Promptly yet, now's a great time. Many beta testers are using it alongside their planning process to create engaging parent communications about their lessons.`
      },
      {
        id: 'teach_beta_invitation',
        name: 'Beta Testing Invitation',
        subject: '🎉 Your Zaza Teach Beta Invitation is Here! (24-hour early access)',
        delay: 168, // 7 days
        tags: ['beta', 'exclusive'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #059669 0%, #7c3aed 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 You're In!</h1>
            <p style="color: #a7f3d0; margin: 10px 0 0 0; font-size: 18px;">Your Zaza Teach Beta Access is Ready</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>The moment you've been waiting for is here!</p>
            
            <p>You now have exclusive 24-hour early access to Zaza Teach beta before we open it to the general waitlist.</p>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #92400e;">⏰ Limited Time: Founding Member Pricing</h3>
              <p style="margin-bottom: 0;">Beta testers get locked-in pricing at 50% off regular rates, plus lifetime access to all updates. This pricing expires once we launch publicly.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://teach.zazatechnologies.com/beta-signup?code=WAITLIST_BETA_2024&utm_source=email&utm_medium=beta_invite&utm_campaign=teach_waitlist" 
                 style="background: linear-gradient(135deg, #059669 0%, #7c3aed 100%); color: white; padding: 18px 36px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                Start Your Beta Trial →
              </a>
              <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">Beta access code: WAITLIST_BETA_2024</p>
            </div>
            
            <h3 style="color: #7c3aed;">What's included in your beta trial:</h3>
            
            <div style="display: grid; gap: 15px; margin: 20px 0;">
              <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; border-left: 3px solid #22c55e;">
                <strong>✅ Complete Lesson Planning Suite</strong><br>
                Generate full lesson plans for any subject, year level, and duration
              </div>
              
              <div style="background: #eff6ff; padding: 15px; border-radius: 6px; border-left: 3px solid #3b82f6;">
                <strong>✅ Smart Differentiation Engine</strong><br>
                Automatic activity variations for different ability levels
              </div>
              
              <div style="background: #fef7ff; padding: 15px; border-radius: 6px; border-left: 3px solid #ec4899;">
                <strong>✅ Resource Generator</strong><br>
                Creates worksheets, assessments, and extension activities
              </div>
              
              <div style="background: #fefce8; padding: 15px; border-radius: 6px; border-left: 3px solid #eab308;">
                <strong>✅ Curriculum Alignment</strong><br>
                Ensures every lesson meets your curriculum standards
              </div>
              
              <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; border-left: 3px solid #0ea5e9;">
                <strong>✅ Export & Integration</strong><br>
                Download lessons as PDF, Word, or copy to your planning platform
              </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0;">
              <h4 style="margin-top: 0; color: #334155;">Your Beta Feedback Matters</h4>
              <p>As a beta tester, your feedback directly shapes the final product. We're particularly interested in:</p>
              <ul style="margin-bottom: 0;">
                <li>Which features save you the most time</li>
                <li>How well the AI understands your teaching style</li>
                <li>What additional features would be most valuable</li>
                <li>How intuitive the interface feels for daily use</li>
              </ul>
            </div>
            
            <p><strong>Getting started is easy:</strong></p>
            <ol>
              <li>Click the beta access link above</li>
              <li>Complete the quick setup (tells the AI about your teaching context)</li>
              <li>Generate your first lesson plan</li>
              <li>Share your feedback via the in-app feedback tool</li>
            </ol>
            
            <p><strong>Beta support:</strong> I'm personally monitoring all beta feedback. If you hit any issues or have suggestions, there's a direct line to me through the beta platform.</p>
            
            <p>Thank you for being part of this journey. Your early support and feedback are making Zaza Teach better for teachers everywhere.</p>
            
            <p>Happy planning!</p>
            
            <p>Dr. Greg Blackburn<br>
            <em>Founder & Chief Product Officer</em><br>
            <em>Zaza Technologies</em></p>
            
            <div style="background: #fee2e2; padding: 15px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 25px 0;">
              <p style="margin: 0; color: #991b1b; font-size: 14px;"><strong>Reminder:</strong> This beta access expires in 24 hours and will then open to the general waitlist. Founding member pricing is only available during beta period.</p>
            </div>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">Zaza Teach Beta | The future of lesson planning</p>
          </div>
        </div>`,
        textContent: `🎉 Your Zaza Teach Beta Invitation is Here!

The moment you've been waiting for is here!

You now have exclusive 24-hour early access to Zaza Teach beta before we open it to the general waitlist.

⏰ Limited Time: Founding Member Pricing
Beta testers get locked-in pricing at 50% off regular rates, plus lifetime access to all updates. This pricing expires once we launch publicly.

Start Your Beta Trial: https://teach.zazatechnologies.com/beta-signup?code=WAITLIST_BETA_2024&utm_source=email&utm_medium=beta_invite&utm_campaign=teach_waitlist

Beta access code: WAITLIST_BETA_2024

What's included in your beta trial:

✅ Complete Lesson Planning Suite
Generate full lesson plans for any subject, year level, and duration

✅ Smart Differentiation Engine  
Automatic activity variations for different ability levels

✅ Resource Generator
Creates worksheets, assessments, and extension activities

✅ Curriculum Alignment
Ensures every lesson meets your curriculum standards

✅ Export & Integration
Download lessons as PDF, Word, or copy to your planning platform

Your Beta Feedback Matters
As a beta tester, your feedback directly shapes the final product. We're particularly interested in:
• Which features save you the most time
• How well the AI understands your teaching style  
• What additional features would be most valuable
• How intuitive the interface feels for daily use

Getting started is easy:
1. Click the beta access link above
2. Complete the quick setup (tells the AI about your teaching context)
3. Generate your first lesson plan
4. Share your feedback via the in-app feedback tool

Beta support: I'm personally monitoring all beta feedback. If you hit any issues or have suggestions, there's a direct line to me through the beta platform.

Thank you for being part of this journey. Your early support and feedback are making Zaza Teach better for teachers everywhere.

Happy planning!

Dr. Greg Blackburn
Founder & Chief Product Officer
Zaza Technologies

Reminder: This beta access expires in 24 hours and will then open to the general waitlist. Founding member pricing is only available during beta period.

---
Zaza Teach Beta | The future of lesson planning`
      }
    ]
  },

  general_tips: {
    id: 'general_tips',
    name: 'General Teaching Tips Sequence',
    description: '3-email sequence for teachers interested in general AI and teaching tips',
    triggerTags: ['general_tips', 'teaching_tips'],
    emails: [
      {
        id: 'tips_welcome',
        name: 'Teaching Tips Welcome',
        subject: '5 AI Teaching Hacks That Save 2+ Hours Daily ⚡',
        delay: 0,
        tags: ['tips', 'welcome'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 26px;">5 AI Teaching Hacks ⚡</h1>
            <p style="color: #fed7aa; margin: 10px 0 0 0;">Save 2+ hours daily with these simple tricks</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>Welcome to the AI Teaching Tips community!</p>
            
            <p>I'm Dr. Greg Blackburn, and over the past 3 years, I've discovered dozens of AI shortcuts that have transformed how teachers work. Today, I'm sharing my top 5 time-savers that you can implement immediately.</p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #166534;">⚡ Hack #1: The 30-Second Lesson Hook</h3>
              <p><strong>Problem:</strong> Coming up with engaging lesson starters</p>
              <p><strong>AI Solution:</strong> "Create 3 engaging hooks for a lesson on [topic] for Year [X] students. Include a question, an interesting fact, and a quick activity."</p>
              <p style="margin-bottom: 0;"><strong>Time saved:</strong> 15 minutes per lesson × 5 lessons = 75 minutes daily</p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">⚡ Hack #2: Instant Differentiation</h3>
              <p><strong>Problem:</strong> Creating activities for different ability levels</p>
              <p><strong>AI Solution:</strong> "Take this activity: [paste activity]. Create 3 versions: simplified for struggling learners, standard for grade level, extended for advanced students."</p>
              <p style="margin-bottom: 0;"><strong>Time saved:</strong> 20 minutes per activity × 3 activities = 60 minutes daily</p>
            </div>
            
            <div style="background: #fef7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #a21caf;">⚡ Hack #3: Professional Parent Emails</h3>
              <p><strong>Problem:</strong> Writing diplomatic emails to challenging parents</p>
              <p><strong>AI Solution:</strong> "Rewrite this email to be more professional and solution-focused: [paste draft]. Use educational tone, acknowledge concerns, and suggest next steps."</p>
              <p style="margin-bottom: 0;"><strong>Time saved:</strong> 10 minutes per email × 4 emails = 40 minutes daily</p>
            </div>
            
            <div style="background: #fefce8; padding: 20px; border-radius: 8px; border-left: 4px solid #eab308; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #a16207;">⚡ Hack #4: Quick Assessment Rubrics</h3>
              <p><strong>Problem:</strong> Creating clear assessment criteria</p>
              <p><strong>AI Solution:</strong> "Create a 4-level rubric for assessing [skill/assignment] in Year [X]. Include specific descriptors for each level and common student examples."</p>
              <p style="margin-bottom: 0;"><strong>Time saved:</strong> 15 minutes per rubric × 2 assessments = 30 minutes daily</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">⚡ Hack #5: Behavior Documentation</h3>
              <p><strong>Problem:</strong> Writing incident reports and behavior notes</p>
              <p><strong>AI Solution:</strong> "Help me write a professional incident report. Student: [name], Issue: [brief description], Context: [when/where], Action taken: [what you did]. Use objective language appropriate for admin review."</p>
              <p style="margin-bottom: 0;"><strong>Time saved:</strong> 5 minutes per incident × 3 incidents = 15 minutes daily</p>
            </div>
            
            <div style="background: #1f2937; color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h3 style="margin-top: 0;">Total Daily Time Savings: 220+ Minutes</h3>
              <p style="margin-bottom: 0; font-size: 18px; color: #d1d5db;">That's nearly 4 hours back in your day!</p>
            </div>
            
            <h3 style="color: #f59e0b;">Want the AI Tool That Does All This Automatically?</h3>
            
            <p>These hacks work with any AI tool, but I built <strong>Zaza Promptly</strong> specifically to make them even faster and more accurate for teachers. It includes:</p>
            
            <ul>
              <li>✅ Pre-built templates for all these scenarios</li>
              <li>✅ Education-specific language and tone</li>
              <li>✅ Curriculum alignment built-in</li>
              <li>✅ GDPR compliant and privacy-focused</li>
            </ul>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://zazapromptly.com/demo?utm_source=email&utm_medium=tips&utm_campaign=5_hacks" 
                 style="background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Try These Hacks with Zaza Promptly →
              </a>
            </div>
            
            <p><strong>Coming up:</strong> Tomorrow I'll show you advanced AI techniques for lesson planning that can save you 3+ hours weekly.</p>
            
            <p>Start implementing these hacks today, and let me know how much time you save!</p>
            
            <p>Dr. Greg Blackburn<br>
            <em>AI Teaching Specialist & Founder, Zaza Promptly</em></p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">AI Teaching Tips | Save hours with smart shortcuts</p>
          </div>
        </div>`,
        textContent: `5 AI Teaching Hacks That Save 2+ Hours Daily ⚡

Welcome to the AI Teaching Tips community!

I'm Dr. Greg Blackburn, and over the past 3 years, I've discovered dozens of AI shortcuts that have transformed how teachers work. Today, I'm sharing my top 5 time-savers that you can implement immediately.

⚡ Hack #1: The 30-Second Lesson Hook
Problem: Coming up with engaging lesson starters
AI Solution: "Create 3 engaging hooks for a lesson on [topic] for Year [X] students. Include a question, an interesting fact, and a quick activity."
Time saved: 15 minutes per lesson × 5 lessons = 75 minutes daily

⚡ Hack #2: Instant Differentiation  
Problem: Creating activities for different ability levels
AI Solution: "Take this activity: [paste activity]. Create 3 versions: simplified for struggling learners, standard for grade level, extended for advanced students."
Time saved: 20 minutes per activity × 3 activities = 60 minutes daily

⚡ Hack #3: Professional Parent Emails
Problem: Writing diplomatic emails to challenging parents
AI Solution: "Rewrite this email to be more professional and solution-focused: [paste draft]. Use educational tone, acknowledge concerns, and suggest next steps."
Time saved: 10 minutes per email × 4 emails = 40 minutes daily

⚡ Hack #4: Quick Assessment Rubrics
Problem: Creating clear assessment criteria  
AI Solution: "Create a 4-level rubric for assessing [skill/assignment] in Year [X]. Include specific descriptors for each level and common student examples."
Time saved: 15 minutes per rubric × 2 assessments = 30 minutes daily

⚡ Hack #5: Behavior Documentation
Problem: Writing incident reports and behavior notes
AI Solution: "Help me write a professional incident report. Student: [name], Issue: [brief description], Context: [when/where], Action taken: [what you did]. Use objective language appropriate for admin review."
Time saved: 5 minutes per incident × 3 incidents = 15 minutes daily

Total Daily Time Savings: 220+ Minutes
That's nearly 4 hours back in your day!

Want the AI Tool That Does All This Automatically?

These hacks work with any AI tool, but I built Zaza Promptly specifically to make them even faster and more accurate for teachers. It includes:

✅ Pre-built templates for all these scenarios
✅ Education-specific language and tone
✅ Curriculum alignment built-in  
✅ GDPR compliant and privacy-focused

Try these hacks with Zaza Promptly: https://zazapromptly.com/demo?utm_source=email&utm_medium=tips&utm_campaign=5_hacks

Coming up: Tomorrow I'll show you advanced AI techniques for lesson planning that can save you 3+ hours weekly.

Start implementing these hacks today, and let me know how much time you save!

Dr. Greg Blackburn
AI Teaching Specialist & Founder, Zaza Promptly

---
AI Teaching Tips | Save hours with smart shortcuts`
      },
      {
        id: 'advanced_planning_tips',
        name: 'Advanced Planning Techniques',
        subject: 'Advanced AI Lesson Planning: 3+ Hours Weekly Savings 📚',
        delay: 24,
        tags: ['advanced', 'planning'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 26px;">Advanced AI Planning 📚</h1>
            <p style="color: #c4b5fd; margin: 10px 0 0 0;">Master-level techniques for 3+ hour savings</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>Yesterday you learned 5 quick AI hacks. Today, we're going deeper with advanced lesson planning techniques that experienced teachers use to save 3+ hours weekly.</p>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #92400e;">🎯 Advanced Technique #1: Unit Backwards Design</h3>
              <p><strong>The Prompt:</strong> "I'm planning a [duration] unit on [topic] for Year [X]. Help me backwards design from this end goal: [learning outcome]. Provide: weekly objectives, key assessments, scaffolding sequence, and potential misconceptions to address."</p>
              
              <p><strong>Why This Works:</strong> Instead of planning lesson by lesson, you get a complete roadmap that ensures every activity builds toward your goal.</p>
              
              <p style="margin-bottom: 0;"><strong>Time Saved:</strong> 2-3 hours of planning per unit</p>
            </div>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">🧠 Advanced Technique #2: Cognitive Load Management</h3>
              <p><strong>The Prompt:</strong> "Analyze this lesson plan for cognitive load: [paste lesson]. Identify where students might feel overwhelmed. Suggest modifications to break complex concepts into manageable chunks with appropriate practice between steps."</p>
              
              <p><strong>Why This Works:</strong> AI can spot cognitive bottlenecks that lead to student confusion, helping you create lessons that actually stick.</p>
              
              <p style="margin-bottom: 0;"><strong>Impact:</strong> Fewer re-teaching sessions, better student outcomes</p>
            </div>
            
            <div style="background: #fef7ff; padding: 20px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #a21caf;">📊 Advanced Technique #3: Data-Driven Differentiation</h3>
              <p><strong>The Prompt:</strong> "Based on this assessment data [describe student performance patterns], design differentiated activities for my next lesson on [topic]. Group students by: [struggling with X], [solid on basics, ready for Y], [excelling, need extension Z]."</p>
              
              <p><strong>Why This Works:</strong> Instead of generic differentiation, you get targeted activities based on actual student needs.</p>
              
              <p style="margin-bottom: 0;"><strong>Result:</strong> Every student appropriately challenged and supported</p>
            </div>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #166534;">🔄 Advanced Technique #4: Cross-Curricular Connections</h3>
              <p><strong>The Prompt:</strong> "I'm teaching [subject/topic]. Identify authentic connections to [other subjects student study]. Design 2-3 activities that reinforce learning in multiple areas while maintaining focus on my main objectives."</p>
              
              <p><strong>Why This Works:</strong> Students see relevance and make deeper connections, while you efficiently address multiple learning areas.</p>
              
              <p style="margin-bottom: 0;"><strong>Bonus:</strong> Admin loves seeing cross-curricular integration</p>
            </div>
            
            <div style="background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #0369a1;">🎭 Advanced Technique #5: Engagement Pattern Analysis</h3>
              <p><strong>The Prompt:</strong> "Analyze this lesson structure for student engagement: [paste lesson timing]. Suggest modifications to maintain attention throughout, considering: attention spans for Year [X], energy management, and transition points."</p>
              
              <p><strong>Why This Works:</strong> AI can predict engagement dips and suggest strategic activity changes, movement breaks, and attention resets.</p>
              
              <p style="margin-bottom: 0;"><strong>Outcome:</strong> Lessons that maintain momentum from start to finish</p>
            </div>
            
            <div style="background: #1f2937; color: white; padding: 25px; border-radius: 8px; margin: 30px 0;">
              <h3 style="margin-top: 0; text-align: center;">Pro Teacher Secret:</h3>
              <p style="text-align: center; margin-bottom: 0; font-size: 16px; color: #d1d5db;">Chain these techniques together. Use backwards design for unit planning, then apply cognitive load and engagement analysis to individual lessons. The compound effect is powerful.</p>
            </div>
            
            <h3 style="color: #7c3aed;">Implementation Strategy:</h3>
            
            <ol>
              <li><strong>Start with one technique</strong> - Pick the one that addresses your biggest planning challenge</li>
              <li><strong>Master it over 2 weeks</strong> - Use it consistently until it becomes automatic</li>
              <li><strong>Add the next technique</strong> - Build your AI planning toolkit gradually</li>
              <li><strong>Combine and refine</strong> - Once comfortable, chain techniques together for maximum efficiency</li>
            </ol>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 25px 0;">
              <h4 style="margin-top: 0; color: #334155;">Teacher Feedback:</h4>
              <p style="font-style: italic; margin-bottom: 15px;">"I started using the backwards design technique 3 weeks ago. My units are so much more coherent now, and I'm spending way less time wondering 'what should I teach next?' The end goal keeps everything focused." - Sarah M., Primary Teacher</p>
              <p style="font-style: italic; margin-bottom: 0;">"The cognitive load analysis changed everything. I was cramming too much into single lessons. Now my students actually retain what I teach!" - Marcus T., High School Science</p>
            </div>
            
            <p><strong>Tomorrow's email:</strong> I'll share my personal AI workflow that lets me plan a full week of lessons in 30 minutes.</p>
            
            <p>Try one advanced technique this week and let me know how it goes!</p>
            
            <p>Dr. Greg Blackburn<br>
            <em>AI Teaching Specialist</em></p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="https://zazapromptly.com/advanced-techniques?utm_source=email&utm_medium=tips&utm_campaign=advanced_planning" 
                 style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                Get Advanced Templates →
              </a>
            </div>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">AI Teaching Tips | Advanced techniques for experienced educators</p>
          </div>
        </div>`,
        textContent: `Advanced AI Lesson Planning: 3+ Hours Weekly Savings 📚

Yesterday you learned 5 quick AI hacks. Today, we're going deeper with advanced lesson planning techniques that experienced teachers use to save 3+ hours weekly.

🎯 Advanced Technique #1: Unit Backwards Design
The Prompt: "I'm planning a [duration] unit on [topic] for Year [X]. Help me backwards design from this end goal: [learning outcome]. Provide: weekly objectives, key assessments, scaffolding sequence, and potential misconceptions to address."

Why This Works: Instead of planning lesson by lesson, you get a complete roadmap that ensures every activity builds toward your goal.

Time Saved: 2-3 hours of planning per unit

🧠 Advanced Technique #2: Cognitive Load Management
The Prompt: "Analyze this lesson plan for cognitive load: [paste lesson]. Identify where students might feel overwhelmed. Suggest modifications to break complex concepts into manageable chunks with appropriate practice between steps."

Why This Works: AI can spot cognitive bottlenecks that lead to student confusion, helping you create lessons that actually stick.

Impact: Fewer re-teaching sessions, better student outcomes

📊 Advanced Technique #3: Data-Driven Differentiation  
The Prompt: "Based on this assessment data [describe student performance patterns], design differentiated activities for my next lesson on [topic]. Group students by: [struggling with X], [solid on basics, ready for Y], [excelling, need extension Z]."

Why This Works: Instead of generic differentiation, you get targeted activities based on actual student needs.

Result: Every student appropriately challenged and supported

🔄 Advanced Technique #4: Cross-Curricular Connections
The Prompt: "I'm teaching [subject/topic]. Identify authentic connections to [other subjects student study]. Design 2-3 activities that reinforce learning in multiple areas while maintaining focus on my main objectives."

Why This Works: Students see relevance and make deeper connections, while you efficiently address multiple learning areas.

Bonus: Admin loves seeing cross-curricular integration

🎭 Advanced Technique #5: Engagement Pattern Analysis
The Prompt: "Analyze this lesson structure for student engagement: [paste lesson timing]. Suggest modifications to maintain attention throughout, considering: attention spans for Year [X], energy management, and transition points."

Why This Works: AI can predict engagement dips and suggest strategic activity changes, movement breaks, and attention resets.

Outcome: Lessons that maintain momentum from start to finish

Pro Teacher Secret:
Chain these techniques together. Use backwards design for unit planning, then apply cognitive load and engagement analysis to individual lessons. The compound effect is powerful.

Implementation Strategy:
1. Start with one technique - Pick the one that addresses your biggest planning challenge
2. Master it over 2 weeks - Use it consistently until it becomes automatic  
3. Add the next technique - Build your AI planning toolkit gradually
4. Combine and refine - Once comfortable, chain techniques together for maximum efficiency

Teacher Feedback:
"I started using the backwards design technique 3 weeks ago. My units are so much more coherent now, and I'm spending way less time wondering 'what should I teach next?' The end goal keeps everything focused." - Sarah M., Primary Teacher

"The cognitive load analysis changed everything. I was cramming too much into single lessons. Now my students actually retain what I teach!" - Marcus T., High School Science

Tomorrow's email: I'll share my personal AI workflow that lets me plan a full week of lessons in 30 minutes.

Try one advanced technique this week and let me know how it goes!

Dr. Greg Blackburn
AI Teaching Specialist

Get Advanced Templates: https://zazapromptly.com/advanced-techniques?utm_source=email&utm_medium=tips&utm_campaign=advanced_planning

---
AI Teaching Tips | Advanced techniques for experienced educators`
      },
      {
        id: 'weekly_planning_workflow',
        name: 'Weekly Planning Workflow',
        subject: 'My 30-Minute Weekly Planning Workflow (Step-by-Step) ⏱️',
        delay: 72,
        tags: ['workflow', 'efficiency'],
        htmlContent: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="background: linear-gradient(135deg, #059669 0%, #0891b2 100%); padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 26px;">30-Minute Planning Workflow ⏱️</h1>
            <p style="color: #a7f3d0; margin: 10px 0 0 0;">My complete system for weekly lesson planning</p>
          </div>
          
          <div style="padding: 30px 20px; background: #ffffff; border: 1px solid #e5e7eb;">
            <p>This is the email teachers ask for most: my exact workflow for planning an entire week of lessons in 30 minutes using AI.</p>
            
            <p>I developed this system through 3 years of refinement. It's now used by over 500 teachers in my AI Teaching Mastermind.</p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #1e40af;">📋 The Complete 30-Minute Workflow</h3>
              <p style="margin-bottom: 0;"><strong>Preparation (Done once per term):</strong> Set up your AI context document with class details, curriculum requirements, and teaching preferences.</p>
            </div>
            
            <h3 style="color: #059669; margin-top: 30px;">Step 1: Weekly Overview (5 minutes)</h3>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 15px 0;">
              <p><strong>AI Prompt:</strong> "Plan my week of [subject] lessons for Year [X]. This week's focus: [topic/unit]. I have [number] lessons of [duration] each. Students' current understanding: [brief assessment of where they are]. Create a logical sequence that builds understanding progressively."</p>
            </div>
            
            <p><strong>Output:</strong> A complete week outline with lesson sequence, key concepts for each day, and suggested assessment points.</p>
            
            <h3 style="color: #059669;">Step 2: Individual Lesson Details (20 minutes - 4 minutes per lesson)</h3>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 15px 0;">
              <p><strong>AI Prompt for each lesson:</strong> "Expand Monday's lesson [or Tuesday's, etc.] from the weekly plan. Include: engaging starter (3 mins), main teaching sequence with student activities, differentiation for [specific needs in your class], formative assessment opportunities, and plenary. Format as a detailed lesson plan."</p>
            </div>
            
            <p><strong>Pro tip:</strong> Copy-paste the weekly overview into each lesson prompt so the AI maintains consistency.</p>
            
            <h3 style="color: #059669;">Step 3: Resource Generation (5 minutes)</h3>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 6px; border: 1px solid #e2e8f0; margin: 15px 0;">
              <p><strong>AI Prompt:</strong> "Create supporting resources for this week's lessons: [paste weekly overview]. I need: worksheet for Tuesday's activity, assessment rubric for Friday's task, and parent communication explaining this week's focus and how families can support at home."</p>
            </div>
            
            <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 25px 0;">
              <h3 style="margin-top: 0; color: #92400e;">🎯 Advanced Workflow Secrets</h3>
              
              <h4 style="color: #92400e;">Secret #1: The Context Document</h4>
              <p>Save this template and paste it before every planning session:</p>
              <div style="background: white; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; border: 1px solid #e5e7eb; margin: 10px 0;">
CLASS CONTEXT:<br>
Year Level: [X]<br>
Subject: [Subject]<br>
Class Size: [X] students<br>
Key Learning Needs: [brief description]<br>
Available Resources: [what you have]<br>
Curriculum Framework: [which curriculum]<br>
My Teaching Style: [collaborative/direct instruction/inquiry-based/etc.]<br>
Assessment Approach: [how you prefer to assess]
              </div>
              
              <h4 style="color: #92400e;">Secret #2: The Refinement Loop</h4>
              <p>After AI generates initial plans, use this follow-up prompt:</p>
              <div style="background: white; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; border: 1px solid #e5e7eb; margin: 10px 0;">
"Review these lesson plans for: engagement variety, cognitive load management, and practical feasibility given my resources. Suggest 2-3 specific improvements."
              </div>
              
              <h4 style="color: #92400e;">Secret #3: The Bank System</h4>
              <p style="margin-bottom: 0;">Save your best AI-generated content in topic-based folders. When planning similar units, reference previous successes: "Use the same structure as my successful fractions unit, but adapt for [new topic]."</p>
            </div>
            
            <h3 style="color: #059669;">Real Teacher Results:</h3>
            
            <div style="display: grid; gap: 15px; margin: 20px 0;">
              <div style="background: #f0fdf4; padding: 15px; border-radius: 6px; border-left: 3px solid #22c55e;">
                <p style="margin: 0; font-style: italic;">"I was spending 4-5 hours every Sunday planning. Now it's 30 minutes while I drink my coffee. My lessons are actually BETTER because I'm not rushing." - Emma R., Year 6 Teacher</p>
              </div>
              
              <div style="background: #eff6ff; padding: 15px; border-radius: 6px; border-left: 3px solid #3b82f6;">
                <p style="margin: 0; font-style: italic;">"The context document was a game-changer. AI now 'knows' my class and creates plans that actually fit my students and teaching style." - David K., High School History</p>
              </div>
              
              <div style="background: #fef7ff; padding: 15px; border-radius: 6px; border-left: 3px solid #ec4899;">
                <p style="margin: 0; font-style: italic;">"I use this workflow for 3 different subjects. Same 30-minute process, just different context documents. It's revolutionized my work-life balance." - Priya S., Secondary HOD</p>
              </div>
            </div>
            
            <div style="background: #1f2937; color: white; padding: 25px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <h3 style="margin-top: 0;">Weekly Time Savings: 3-4 Hours</h3>
              <p style="margin-bottom: 0; color: #d1d5db;">That's 12-16 hours monthly. What would you do with an extra day each month?</p>
            </div>
            
            <h3 style="color: #059669;">Implementation Guide:</h3>
            
            <p><strong>Week 1:</strong> Set up your context document and try the weekly overview step only.</p>
            <p><strong>Week 2:</strong> Add individual lesson details. Focus on getting comfortable with the prompt format.</p>
            <p><strong>Week 3:</strong> Include resource generation. Build your template bank.</p>
            <p><strong>Week 4:</strong> Add refinement loops and start customizing prompts to your needs.</p>
            
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 25px 0;">
              <h4 style="margin-top: 0; color: #166534;">🎁 Bonus: Get My Complete Workflow Templates</h4>
              <p>I've created a downloadable template pack with all the prompts, context documents, and refinement questions from this workflow. It includes subject-specific variations and troubleshooting guides.</p>
              
              <div style="text-align: center; margin-top: 15px;">
                <a href="https://zazapromptly.com/workflow-templates?utm_source=email&utm_medium=tips&utm_campaign=30min_workflow" 
                   style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                  Download Workflow Templates →
                </a>
              </div>
            </div>
            
            <p>This workflow has transformed how hundreds of teachers approach planning. Try it this week and let me know your results!</p>
            
            <p><strong>Questions?</strong> Just hit reply - I read every email and often use teacher questions to create new content.</p>
            
            <p>Here's to reclaiming your weekends,</p>
            
            <p>Dr. Greg Blackburn<br>
            <em>Creator of the 30-Minute Planning System</em></p>
            
            <p style="font-size: 14px; color: #6b7280;"><em>P.S. Next week I'm sharing advanced techniques for using AI in parent-teacher conferences. It's a game-changer for those difficult conversations!</em></p>
          </div>
          
          <div style="padding: 20px; background: #f9fafb; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: 0;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">AI Teaching Tips | Proven workflows for efficient educators</p>
          </div>
        </div>`,
        textContent: `My 30-Minute Weekly Planning Workflow (Step-by-Step) ⏱️

This is the email teachers ask for most: my exact workflow for planning an entire week of lessons in 30 minutes using AI.

I developed this system through 3 years of refinement. It's now used by over 500 teachers in my AI Teaching Mastermind.

📋 The Complete 30-Minute Workflow

Preparation (Done once per term): Set up your AI context document with class details, curriculum requirements, and teaching preferences.

Step 1: Weekly Overview (5 minutes)

AI Prompt: "Plan my week of [subject] lessons for Year [X]. This week's focus: [topic/unit]. I have [number] lessons of [duration] each. Students' current understanding: [brief assessment of where they are]. Create a logical sequence that builds understanding progressively."

Output: A complete week outline with lesson sequence, key concepts for each day, and suggested assessment points.

Step 2: Individual Lesson Details (20 minutes - 4 minutes per lesson)

AI Prompt for each lesson: "Expand Monday's lesson [or Tuesday's, etc.] from the weekly plan. Include: engaging starter (3 mins), main teaching sequence with student activities, differentiation for [specific needs in your class], formative assessment opportunities, and plenary. Format as a detailed lesson plan."

Pro tip: Copy-paste the weekly overview into each lesson prompt so the AI maintains consistency.

Step 3: Resource Generation (5 minutes)

AI Prompt: "Create supporting resources for this week's lessons: [paste weekly overview]. I need: worksheet for Tuesday's activity, assessment rubric for Friday's task, and parent communication explaining this week's focus and how families can support at home."

🎯 Advanced Workflow Secrets

Secret #1: The Context Document
Save this template and paste it before every planning session:

CLASS CONTEXT:
Year Level: [X]
Subject: [Subject]  
Class Size: [X] students
Key Learning Needs: [brief description]
Available Resources: [what you have]
Curriculum Framework: [which curriculum]
My Teaching Style: [collaborative/direct instruction/inquiry-based/etc.]
Assessment Approach: [how you prefer to assess]

Secret #2: The Refinement Loop
After AI generates initial plans, use this follow-up prompt:
"Review these lesson plans for: engagement variety, cognitive load management, and practical feasibility given my resources. Suggest 2-3 specific improvements."

Secret #3: The Bank System
Save your best AI-generated content in topic-based folders. When planning similar units, reference previous successes: "Use the same structure as my successful fractions unit, but adapt for [new topic]."

Real Teacher Results:

"I was spending 4-5 hours every Sunday planning. Now it's 30 minutes while I drink my coffee. My lessons are actually BETTER because I'm not rushing." - Emma R., Year 6 Teacher

"The context document was a game-changer. AI now 'knows' my class and creates plans that actually fit my students and teaching style." - David K., High School History

"I use this workflow for 3 different subjects. Same 30-minute process, just different context documents. It's revolutionized my work-life balance." - Priya S., Secondary HOD

Weekly Time Savings: 3-4 Hours
That's 12-16 hours monthly. What would you do with an extra day each month?

Implementation Guide:
Week 1: Set up your context document and try the weekly overview step only.
Week 2: Add individual lesson details. Focus on getting comfortable with the prompt format.
Week 3: Include resource generation. Build your template bank.  
Week 4: Add refinement loops and start customizing prompts to your needs.

🎁 Bonus: Get My Complete Workflow Templates
I've created a downloadable template pack with all the prompts, context documents, and refinement questions from this workflow. It includes subject-specific variations and troubleshooting guides.

Download Workflow Templates: https://zazapromptly.com/workflow-templates?utm_source=email&utm_medium=tips&utm_campaign=30min_workflow

This workflow has transformed how hundreds of teachers approach planning. Try it this week and let me know your results!

Questions? Just hit reply - I read every email and often use teacher questions to create new content.

Here's to reclaiming your weekends,

Dr. Greg Blackburn
Creator of the 30-Minute Planning System

P.S. Next week I'm sharing advanced techniques for using AI in parent-teacher conferences. It's a game-changer for those difficult conversations!

---
AI Teaching Tips | Proven workflows for efficient educators`
      }
    ]
  }
};

// Brevo API integration helper functions
export class EmailSequenceManager {
  private static readonly BREVO_API_BASE = 'https://api.brevo.com/v3';

  // Create email campaign in Brevo
  static async createEmailCampaign(template: EmailTemplate, listIds: number[]): Promise<boolean> {
    try {
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error('Brevo API key not configured for email sequences');
        return false;
      }

      const campaignData = {
        name: template.name,
        subject: template.subject,
        htmlContent: template.htmlContent,
        textContent: template.textContent,
        scheduledAt: new Date(Date.now() + (template.delay * 60 * 60 * 1000)).toISOString(),
        recipients: {
          listIds: listIds
        },
        inlineImageActivation: false,
        mirrorActive: false,
        recurring: false,
        type: 'classic',
        replyTo: 'greg@zazatechnologies.com',
        toField: '{{contact.FIRSTNAME|default:"there"}}',
        tag: template.tags.join(',')
      };

      const response = await fetch(`${this.BREVO_API_BASE}/emailCampaigns`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(campaignData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Email campaign created: ${template.name} (ID: ${result.id})`);
        return true;
      } else {
        const error = await response.text();
        console.error(`Failed to create email campaign ${template.name}:`, error);
        return false;
      }
    } catch (error) {
      console.error(`Error creating email campaign:`, error);
      return false;
    }
  }

  // Set up automation workflow in Brevo (requires manual configuration)
  static async setupAutomationWorkflow(sequence: EmailSequence): Promise<void> {
    console.log(`Setting up automation workflow for: ${sequence.name}`);
    console.log(`Trigger tags: ${sequence.triggerTags.join(', ')}`);
    console.log(`Email sequence:`);
    
    sequence.emails.forEach((email, index) => {
      console.log(`  ${index + 1}. ${email.name} (${email.delay}h delay)`);
      console.log(`     Subject: ${email.subject}`);
      console.log(`     Tags: ${email.tags.join(', ')}`);
    });
    
    // Note: Brevo automation workflows typically need to be set up manually
    // through their interface. This function provides the structure needed.
  }

  // Trigger specific email sequence for a contact
  static async triggerSequence(email: string, sequenceId: string): Promise<boolean> {
    try {
      const sequence = EMAIL_SEQUENCES[sequenceId];
      if (!sequence) {
        console.error(`Email sequence not found: ${sequenceId}`);
        return false;
      }

      // Add contact to appropriate lists and tags
      const apiKey = process.env.BREVO_API_KEY;
      if (!apiKey) {
        console.error('Brevo API key not configured');
        return false;
      }

      // Update contact with sequence tags
      const updateData = {
        attributes: {
          EMAIL_SEQUENCE: sequenceId,
          SEQUENCE_START_DATE: new Date().toISOString()
        }
      };

      const response = await fetch(`${this.BREVO_API_BASE}/contacts/${email}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        console.log(`Email sequence ${sequenceId} triggered for ${email}`);
        return true;
      } else {
        console.error(`Failed to trigger sequence for ${email}`);
        return false;
      }
    } catch (error) {
      console.error(`Error triggering email sequence:`, error);
      return false;
    }
  }
}

// Helper function to determine which sequence to trigger based on tags
export function getSequenceForTags(tags: string[]): string | null {
  // Priority order - most specific first
  if (tags.some(tag => ['teach_waitlist', 'teach_interest'].includes(tag))) {
    return 'teach_waitlist';
  }
  
  if (tags.some(tag => ['general_tips', 'teaching_tips'].includes(tag))) {
    return 'general_tips';
  }
  
  if (tags.some(tag => ['promptly_interest', 'newsletter_signup'].includes(tag))) {
    return 'promptly_interest';
  }
  
  return null;
}