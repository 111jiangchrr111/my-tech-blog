import { Github, Mail, MapPin, Code2, Coffee, BookOpen } from 'lucide-react';

const techStack = [
  'React', 'TypeScript', 'Next.js', 'Vue.js', 'Node.js',
  'Python', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL',
  'Redis', 'MongoDB', 'GraphQL', 'Tailwind CSS', 'Linux',
];

export function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile card */}
      <div className="rounded-xl border border-border/50 glass neon-border p-8 sm:p-10 mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
            D
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-foreground mb-1">
              Developer
            </h1>
            <p className="text-lg text-cyan-400 font-mono mb-3">
              全栈开发工程师
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                中国
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                hello@example.com
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About text */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-6">
          <BookOpen className="h-5 w-5 text-cyan-400" />
          关于我
        </h2>
        <div className="rounded-xl border border-border/50 glass neon-border p-8 prose-cyber">
          <p>
            你好！我是一名热爱技术的全栈开发工程师，拥有多年的 Web 开发经验。
            我相信好的代码不仅是功能的实现，更是思想的表达。
          </p>
          <p>
            这个博客是我记录技术成长的地方。在这里，我会分享前端框架的使用心得、
            后端架构的设计思路、DevOps 的实践经验，以及对软件工程的思考。
            每篇文章都是我在实际项目中遇到问题、解决问题的真实记录。
          </p>
          <p>
            我的技术兴趣涵盖前端工程化、微服务架构、云原生技术、
            以及如何用更好的工程实践来交付高质量的软件产品。
          </p>
        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-6">
          <Code2 className="h-5 w-5 text-cyan-400" />
          技术栈
        </h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map(tech => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-lg text-sm font-mono glass neon-border text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section>
        <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-6">
          <Coffee className="h-5 w-5 text-cyan-400" />
          日常
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: '写代码',
              desc: '日常开发中不断探索新技术的最佳实践',
              emoji: '💻',
            },
            {
              title: '写博客',
              desc: '将技术思考和实践经验记录下来，与人分享',
              emoji: '✍️',
            },
            {
              title: '开源贡献',
              desc: '参与开源社区，为喜爱的项目贡献代码',
              emoji: '🌟',
            },
          ].map(item => (
            <div
              key={item.title}
              className="rounded-xl border border-border/50 glass neon-border p-5 text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
