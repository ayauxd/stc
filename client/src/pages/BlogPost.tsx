import { useParams, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/lib/theme-context";
import { ChevronRight } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  date: string;
  category: string;
  image: string;
}

// Blog post data with full content
const allPosts: BlogPost[] = [
  {
    id: 1,
    title: "Supply Chain Transformation with AI: Beyond Prediction",
    slug: "supply-chain-transformation",
    summary: "How intelligent autonomous systems are revolutionizing logistics and inventory management",
    content: `
      <p>Across industries, traditional supply chain models are being completely reimagined with the integration of autonomous AI systems. These aren't just incremental improvements to existing processes—they represent a paradigm shift in how companies manage complex logistics networks.</p>
      
      <h2>The Evolution of Supply Chain Intelligence</h2>
      <p>For decades, supply chain optimization relied on historical data and human decision-making. Even advanced analytics operated primarily as decision support tools. Today's autonomous AI systems are fundamentally different—they can analyze real-time data streams from multiple sources, make decisions independently, and automatically execute required actions.</p>
      
      <h2>Key Applications in Modern Supply Chains</h2>
      <ul>
        <li><strong>Predictive Inventory Management:</strong> AI systems that continuously analyze purchase patterns, supplier reliability, seasonal factors, and even social media trends to maintain optimal inventory levels without human intervention.</li>
        <li><strong>Autonomous Logistics Routing:</strong> Systems that dynamically reroute shipments based on real-time conditions, from weather disruptions to port congestion, all while optimizing for delivery times and costs.</li>
        <li><strong>Supplier Relationship Automation:</strong> AI agents that monitor supplier performance, negotiate pricing, and even preemptively identify potential supply disruptions before they impact operations.</li>
      </ul>
      
      <h2>Case Study: Global Electronics Manufacturer</h2>
      <p>One of our manufacturing clients implemented an autonomous AI system to manage their component sourcing across 200+ suppliers. The system continuously monitors supplier performance, global component availability, and production schedules to automate purchasing decisions.</p>
      
      <p>Results after 12 months:</p>
      <ul>
        <li>47% reduction in component stockouts</li>
        <li>32% decrease in excess inventory</li>
        <li>$4.3M in annual savings from optimized purchasing</li>
        <li>89% reduction in manual purchasing tasks</li>
      </ul>
      
      <h2>Implementation Challenges and Solutions</h2>
      <p>While the benefits are substantial, implementing autonomous supply chain AI requires careful planning. The most successful implementations typically start with a focused use case, establish clear metrics for success, and incorporate feedback loops for continuous improvement.</p>
      
      <p>The key challenge most organizations face is integration with existing systems. Modern supply chains often involve dozens of specialized software tools, from ERP systems to transportation management platforms. An autonomous system must interface seamlessly with all relevant data sources.</p>
      
      <h2>The Future: Self-Healing Supply Chains</h2>
      <p>The next evolution will be fully autonomous, self-healing supply chains that not only respond to disruptions but actively reshape themselves to prevent issues before they occur. These systems will utilize digital twins of the entire supply network, simulating thousands of scenarios to identify potential vulnerabilities and automatically implement mitigating actions.</p>
      
      <p>Organizations that successfully implement these autonomous systems will gain significant competitive advantages: lower operational costs, increased resilience to disruptions, and the ability to adapt to market changes with unprecedented speed.</p>
    `,
    date: "December 15, 2023",
    category: "Business Strategy",
    image: "/assets/blog-ai-supply-chain.png"
  },
  {
    id: 2,
    title: "The Future of Work: AI Assistants as Collaborative Partners",
    slug: "future-work-ai",
    summary: "Exploring the new paradigm of human-AI collaboration in the modern workplace",
    content: `
      <p>The concept of a "team member" is evolving. Where once we only considered human colleagues, forward-thinking organizations are now integrating AI agents as collaborative team members—entities that don't just execute tasks but actively participate in workflows, make decisions within their domains, and even coordinate work with their human counterparts.</p>
      
      <h2>Beyond Automation: The Rise of AI Teammates</h2>
      <p>Traditional automation focuses on repetitive tasks—AI teammates represent something fundamentally different. These systems can handle complex workflows that require judgment, can adapt to changing conditions, and most importantly, can collaborate with humans in ways that feel natural and complementary.</p>
      
      <h2>Types of AI Teammates Emerging in Today's Workplace</h2>
      <ul>
        <li><strong>Research Partners:</strong> AI systems that actively explore information domains, identify relevant insights, and synthesize findings in ways that complement human expertise.</li>
        <li><strong>Process Orchestrators:</strong> Agents that coordinate complex business processes across departments, handling exceptions and ensuring smooth handoffs between human and automated steps.</li>
        <li><strong>Decision Support Agents:</strong> AI systems that participate in decision processes by providing context, highlighting risks, suggesting alternatives, and explaining reasoning.</li>
        <li><strong>Creative Collaborators:</strong> Tools that actively contribute to creative workflows, generating options, providing inspiration, and helping refine concepts.</li>
      </ul>
      
      <h2>Case Study: Legal Document Review Team</h2>
      <p>A corporate legal department implemented an AI agent as part of their document review team. Rather than simply flagging potential issues, the system was designed to function as a team member with specific responsibilities:</p>
      
      <ul>
        <li>Preliminary analysis of all contracts, categorizing clauses and identifying standard vs. non-standard language</li>
        <li>Drafting explanatory notes for human reviewers, highlighting potential concerns</li>
        <li>Maintaining an active knowledge base of previously reviewed contracts</li>
        <li>Learning from reviewer feedback to continuously improve its analysis</li>
      </ul>
      
      <p>After six months, the team reported:</p>
      <ul>
        <li>68% reduction in time spent on routine contract reviews</li>
        <li>94% accuracy in identifying problematic clauses</li>
        <li>Most significantly, human reviewers reported they now viewed the AI as a respected "junior team member" they could rely on</li>
      </ul>
      
      <h2>Organizational and Cultural Considerations</h2>
      <p>Successfully integrating AI teammates requires technical implementation and cultural adaptation. Organizations need to consider:</p>
      
      <ul>
        <li><strong>Role Definition:</strong> Clearly defining where AI agents have authority to act independently vs. where they should defer to humans</li>
        <li><strong>Feedback Mechanisms:</strong> Creating effective ways for humans to provide feedback that improves AI performance</li>
        <li><strong>Transparency:</strong> Ensuring team members understand the capabilities and limitations of their AI colleagues</li>
        <li><strong>Trust Building:</strong> Deliberately creating experiences that build appropriate trust between human and AI teammates</li>
      </ul>
      
      <h2>The Path Forward</h2>
      <p>The most successful implementations of AI teammates start small, with clearly defined roles that gradually expand as trust and capabilities grow. Rather than attempting to replace entire job functions, forward-thinking organizations are identifying specific collaborative workflows where AI agents can make meaningful contributions.</p>
      
      <p>The future workplace won't be human OR AI—it will be human AND AI, working together in ways that leverage the unique strengths of each. Organizations that learn to effectively blend human creativity, judgment, and empathy with AI's speed, consistency, and analytical capabilities will define the next generation of productive workplaces.</p>
    `,
    date: "November 29, 2023",
    category: "Workplace Innovation",
    image: "/assets/blog-future-work-ai.png"
  },
  {
    id: 3,
    title: "Engineering the Perfect Prompt: The Art & Science",
    slug: "prompt-engineering",
    summary: "Why mastering prompt design is becoming a critical business competency",
    content: `
      <p>As large language models (LLMs) become increasingly integrated into business workflows, organizations are discovering that the quality of outputs is heavily dependent on how questions and instructions are framed. This emerging field—prompt engineering—is quickly becoming a critical skill for maximizing return on AI investments.</p>
      
      <h2>Understanding Prompt Engineering</h2>
      <p>Prompt engineering is the practice of designing inputs to AI systems that reliably produce the desired outputs. It's part science, part art form, combining an understanding of how LLMs process information with domain expertise about the specific business context.</p>
      
      <h2>Core Principles for Business Applications</h2>
      
      <h3>1. Contextual Framing</h3>
      <p>Providing clear context dramatically improves outcomes. Instead of asking an AI to "write a marketing email," specify the audience, the product's key benefits, the desired tone, and the call to action. This context helps the AI generate content aligned with business objectives.</p>
      
      <h3>2. Role Assignment</h3>
      <p>Assigning a role to the AI guides its response patterns. For example, "As an experienced financial analyst with expertise in renewable energy markets..." sets expectations for the level of expertise and domain knowledge the response should reflect.</p>
      
      <h3>3. Format Specification</h3>
      <p>Explicitly request the output format that matches your business needs—whether that's a bulleted list, a comparison table, a step-by-step process, or JSON data for integration with other systems.</p>
      
      <h3>4. Iterative Refinement</h3>
      <p>The most effective prompt engineering involves multiple rounds of testing and refinement, evaluating outputs against business criteria and adjusting prompts accordingly.</p>
      
      <h2>Case Study: Customer Service Knowledge Base</h2>
      <p>A telecommunications company implemented an internal AI assistant to help customer service representatives find information. Their initial prompts were simple queries like "How do I help a customer reset their router?"</p>
      
      <p>After implementing structured prompt engineering, their template evolved to:</p>
      
      <blockquote>
        "You are an expert customer service advisor with 10+ years of experience in telecommunications. The customer service representative is helping a customer who is experiencing [specific issue]. Provide a step-by-step troubleshooting guide that:</p>
        <p>1. Starts with the most common solutions<br>
        2. Includes questions to ask the customer at each step<br>
        3. Notes when to escalate to a supervisor<br>
        4. References relevant policy numbers where applicable</p>
        <p>Format as a numbered list with clear, concise instructions."
      </blockquote>
      
      <p>This structured approach resulted in:</p>
      <ul>
        <li>42% reduction in average call handling time</li>
        <li>67% decrease in escalations to technical specialists</li>
        <li>91% of representatives reporting more relevant and useful AI responses</li>
      </ul>
      
      <h2>Building Organizational Prompt Engineering Capabilities</h2>
      <p>Forward-thinking companies are treating prompt engineering as a strategic capability by:</p>
      
      <ul>
        <li><strong>Creating Prompt Libraries:</strong> Developing and maintaining collections of effective prompts for common business tasks</li>
        <li><strong>Establishing Governance:</strong> Setting standards for prompt development to ensure security, compliance, and ethical use</li>
        <li><strong>Training Key Personnel:</strong> Developing prompt engineering skills among employees who heavily leverage AI tools</li>
        <li><strong>Measuring Outcomes:</strong> Tracking how prompt improvements impact business metrics</li>
      </ul>
      
      <h2>The Future of Business Prompt Engineering</h2>
      <p>As AI capabilities continue to evolve, so will prompt engineering techniques. Organizations that develop systematic approaches to prompt design will gain significant advantages in productivity, consistency, and quality of AI-assisted work.</p>
      
      <p>The most successful companies won't just use AI tools—they'll develop sophisticated methods to communicate with these systems in ways that consistently produce business value. In this emerging landscape, the ability to effectively "speak AI" may become as important as other forms of business communication.</p>
    `,
    date: "November 17, 2023",
    category: "Technical Insights",
    image: "/assets/prompt-engineering.png"
  }
];

// TODO: Replace with actual data fetching based on slug
const getPostData = (slug: string | undefined): BlogPost | undefined => {
  if (!slug) return undefined;
  return allPosts.find(p => p.slug === slug);
}

interface BlogPostParams {
  slug: string;
}

export default function BlogPost() {
  const { theme } = useTheme();
  const params = useParams<BlogPostParams>();
  const post = getPostData(params.slug);

  if (!post) {
    // TODO: Improve 404 handling, maybe redirect or use NotFound component
    return <div>Post not found</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${
      theme === 'dark' 
        ? 'bg-[#002B36] text-white' 
        : 'bg-white text-[#212121]'
    }`}>
      <Header isSticky={true} />
      <main className="flex-grow container mx-auto px-6 lg:px-12 py-24 md:py-32">
        {/* Add Breadcrumbs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`flex items-center text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Link href="/">
              <a className="hover:text-[#00BCD4] transition-colors">Home</a>
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/insights">
              <a className="hover:text-[#00BCD4] transition-colors">Insights</a>
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
              {post.title}
            </span>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px]">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <article className="prose lg:prose-xl dark:prose-invert max-w-4xl mx-auto">
           <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-[#00BCD4]' : 'text-[#00838F]'}`}>
              {post.category}
            </p>
           <h1 className="mb-4">{post.title}</h1>
           <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
           </p>
           
           {/* Render HTML content safely */}
           <div dangerouslySetInnerHTML={{ __html: post.content }} />
           
           {/* Related Content Section */}
           <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
             <h3 className="text-2xl font-bold mb-6">Related Insights</h3>
             <div className="flex flex-col md:flex-row gap-6">
               {allPosts.filter(p => p.id !== post.id).slice(0, 2).map(relatedPost => (
                 <a 
                   key={relatedPost.id} 
                   href={`/insights/${relatedPost.slug}`}
                   className={`block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                     theme === 'dark' 
                       ? 'bg-[#001B26] hover:shadow-[0_8px_30px_rgba(0,188,212,0.15)]'
                       : 'bg-gray-50 hover:shadow-lg' 
                   }`}
                 >
                   <div className="h-40 overflow-hidden">
                     <img 
                       src={relatedPost.image} 
                       alt={relatedPost.title}
                       className="w-full h-full object-cover"
                     />
                   </div>
                   <div className="p-4">
                     <p className={`text-xs font-semibold uppercase mb-1 ${
                       theme === 'dark' ? 'text-[#00BCD4]' : 'text-[#00838F]'
                     }`}>
                       {relatedPost.category}
                     </p>
                     <h4 className={`font-medium line-clamp-2 ${
                       theme === 'dark' ? 'text-white' : 'text-gray-900'
                     }`}>
                       {relatedPost.title}
                     </h4>
                   </div>
                 </a>
               ))}
             </div>
           </div>
        </article>
      </main>
      <Footer />
    </div>
  );
} 