import { NextResponse } from 'next/server';

// 在开头修改此函数
const addIndexToParagraphs = (content: string): string => {
  // 如果已经包含索引，不做任何更改
  if (content.includes("<p class='index-")) {
    return content;
  }

  // 处理没有任何标签的纯文本响应
  if (!content.includes('<p>') && !content.includes('<br><br>')) {
    // 单个段落的纯文本
    return `<p class='index-0'>${content}</p>`;
  }

  // 处理基于<p>标签的内容
  if (content.includes('<p>')) {
    let index = 0;
    return content.replace(/<p>(.*?)<\/p>/g, (match, group) => {
      return `<p class='index-${index++}'>${group}</p>`;
    });
  }

  // 处理基于<br><br>分隔的内容
  const parts = content.split(/<br\s*\/?><br\s*\/?>/g).filter(Boolean);
  if (parts.length > 0) {
    return parts.map((part, index) => `<p class='index-${index}'>${part}</p>`).join('');
  }

  return content;
};

// Chat API processing function
export async function POST(request: Request) {
  try {
    const { message, language = 'en' } = await request.json();

    // 调试日志
    console.log('接收到API请求:', { message, language });

    // Add a slight delay to simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simple response logic
    let response = '';
    let navigateToSection = null;

    // 根据language参数返回不同语言的回复
    if (language === 'cn') {
      // 调试输出
      console.log('处理中文消息:', message);

      // 检查消息是否等于特定的快捷按钮文本
      if (message === '更多关于你' || message === '介绍自己') {
        console.log("匹配到'更多关于你'或'介绍自己'");
        response =
          "<p class='index-0'>作为一名<b>注重细节的开发者</b>，我喜欢打造既能取悦用户又能帮助企业成长的优雅高效网络解决方案。</p><p class='index-1'>凭借在<b>React</b>、<b>Next.js</b>、<b>TypeScript</b>和<b>Tailwind CSS</b>方面的深厚经验，我将<b>产品思维</b>和<b>商业意识</b>融入开发的每个阶段，确保技术决策与大局保持一致。</p><p class='index-2'>我对<b>UX/UI设计</b>充满热情，喜欢将像素级完美的创意变为现实——构建在任何设备上都流畅的响应式高质量应用程序。通过将<b>系统思维</b>与<b>创造性问题解决</b>相结合，我帮助将复杂需求转化为实用、可扩展的解决方案。</p><p class='index-3'>无论是与跨职能团队合作还是领导项目，我都专注于编写<b>干净、可维护的代码</b>，以提高参与度、性能和成果。</p><p class='index-4'>您想了解更多关于我的<a href='#' onclick='event.preventDefault(); document.getElementById(\"services\").scrollIntoView({behavior: \"smooth\"});' class='text-[#908f8c] underline'>服务</a>，还是查看我的<a href='#' onclick='event.preventDefault(); document.getElementById(\"work\").scrollIntoView({behavior: \"smooth\"});' class='text-[#908f8c] underline'>近期项目</a>？</p>";
        navigateToSection = 'about';
      } else if (message === '我有个问题') {
        console.log("匹配到'我有个问题'");
        response = '当然！我可以回答您关于我的服务、项目或任何与网页开发相关的问题。您想了解什么？';
      }
      // 其他情况用模糊匹配
      else if (message.toLowerCase().includes('项目') || message.toLowerCase().includes('作品')) {
        response =
          "<p class='index-0'>我擅长现代网络技术，包括React、Next.js、TypeScript和TailwindCSS。以下是我的一些近期项目：</p><ul style='margin-top:8px;margin-bottom:8px;padding-left:20px;'><li><b>HiveStream</b> - AI驱动的LinkedIn自动化平台，带分析仪表板</li><li><b>Acorn Ledger</b> - 全栈金融管理平台，集成银行系统</li><li><b>CognixAI</b> - 为AI驱动软件公司设计SEO着陆页</li><li><b>NestEase</b> - 受Airbnb启发的房产预订管理应用</li></ul><p class='index-1'>正在为您导航至项目部分，查看更多详情！</p>";
        navigateToSection = 'work';
      } else if (message.toLowerCase().includes('问题') || message.toLowerCase().includes('疑问')) {
        response = '当然！我可以回答您关于我的服务、项目或任何与网页开发相关的问题。您想了解什么？';
      } else if (
        message.toLowerCase().includes('关于') ||
        message.toLowerCase().includes('自我介绍') ||
        message.toLowerCase().includes('介绍自己') ||
        message.toLowerCase().includes('更多关于你')
      ) {
        response =
          "<p class='index-0'>作为一名<b>注重细节的开发者</b>，我喜欢打造既能取悦用户又能帮助企业成长的优雅高效网络解决方案。</p><p class='index-1'>凭借在<b>React</b>、<b>Next.js</b>、<b>TypeScript</b>和<b>Tailwind CSS</b>方面的深厚经验，我将<b>产品思维</b>和<b>商业意识</b>融入开发的每个阶段，确保技术决策与大局保持一致。</p><p class='index-2'>我对<b>UX/UI设计</b>充满热情，喜欢将像素级完美的创意变为现实——构建在任何设备上都流畅的响应式高质量应用程序。通过将<b>系统思维</b>与<b>创造性问题解决</b>相结合，我帮助将复杂需求转化为实用、可扩展的解决方案。</p><p class='index-3'>无论是与跨职能团队合作还是领导项目，我都专注于编写<b>干净、可维护的代码</b>，以提高参与度、性能和成果。</p><p class='index-4'>您想了解更多关于我的<a href='#' onclick='event.preventDefault(); document.getElementById(\"services\").scrollIntoView({behavior: \"smooth\"});' class='text-[#908f8c] underline'>服务</a>，还是查看我的<a href='#' onclick='event.preventDefault(); document.getElementById(\"work\").scrollIntoView({behavior: \"smooth\"});' class='text-[#908f8c] underline'>近期项目</a>？</p>";
        navigateToSection = 'about';
      } else if (
        message.toLowerCase().includes('hello') ||
        message.toLowerCase().includes('hi') ||
        message.toLowerCase().includes('你好') ||
        message.toLowerCase().includes('嗨')
      ) {
        response = '你好！今天我能帮到您什么？';
      } else if (message.toLowerCase().includes('help') || message.toLowerCase().includes('帮助')) {
        response = '我可以提供关于服务、项目或安排咨询的信息。您想了解什么？';
      } else if (
        message.toLowerCase().includes('contact') ||
        message.toLowerCase().includes('联系') ||
        message.toLowerCase().includes('联络')
      ) {
        response = '您可以通过联系表单或直接发送电子邮件至imavisma@gmail.com与我联系';
        navigateToSection = 'contact';
      } else if (
        message.toLowerCase().includes('service') ||
        message.toLowerCase().includes('services') ||
        message.toLowerCase().includes('服务')
      ) {
        response =
          '我提供前端开发、后端和API解决方案、数字营销以及UX/UI设计服务。您想了解有关任何特定服务的更多信息吗？';
        navigateToSection = 'services';
      } else if (
        message.toLowerCase().includes('price') ||
        message.toLowerCase().includes('cost') ||
        message.toLowerCase().includes('价格') ||
        message.toLowerCase().includes('费用')
      ) {
        response = '定价取决于具体项目需求。您想安排咨询以详细讨论您的项目吗？';
      } else if (
        message.toLowerCase().includes('hobby') ||
        message.toLowerCase().includes('hobbies') ||
        message.toLowerCase().includes('interests') ||
        message.toLowerCase().includes('interesting') ||
        message.toLowerCase().includes('personal') ||
        message.toLowerCase().includes('爱好') ||
        message.toLowerCase().includes('兴趣') ||
        message.toLowerCase().includes('个人')
      ) {
        response =
          "<p class='index-0'>除了编程，我是一名<b>音乐爱好者</b>，收藏了大量涵盖经典和当代艺术家的数字播放列表。</p><p class='index-1'>我也喜欢<b>翻唱流行歌曲</b>并与朋友分享——唱歌已成为我放松和缓解压力的最佳方式。</p><p class='index-2'>我对<b>摄影</b>产生了浓厚的兴趣，目前正在构建我的城市景观和人像摄影作品集。</p><p class='index-3'>在过去几年中，我通过照料<b>热带植物</b>（如白锦龟背竹和龟背竹）找到了工作与生活的平衡。照料这些植物有一种宁静的感觉，帮助我摆脱屏幕并找到平衡视角。</p><p class='index-4'>这些创意活动补充了我的技术工作，帮助我为开发项目带来新的视角和平衡的能量。</p>";
        navigateToSection = null;
      } else {
        response = '感谢您的留言！我会尽快回复您。有什么特别想了解的吗？';
      }
    } else {
      // 英文回复逻辑
      if (
        message.toLowerCase().includes('projects') ||
        message.toLowerCase().includes('project') ||
        message.toLowerCase().includes('works') ||
        message.toLowerCase().includes('work')
      ) {
        response =
          "<p class='index-0'>I specialize in modern web technologies including React, Next.js, TypeScript, and TailwindCSS. Some of my recent projects include:</p><ul style='margin-top:8px;margin-bottom:8px;padding-left:20px;'><li><b>HiveStream</b> - AI-powered LinkedIn automation platform with analytics dashboards</li><li><b>Acorn Ledger</b> - Full-stack financial management platform with bank integration</li><li><b>CognixAI</b> - SEO landing UI for AI-driven software development company</li><li><b>NestEase</b> - Property booking and management application inspired by Airbnb</li></ul><p class='index-1'>I'm navigating you to my projects section for more details!</p>";
        navigateToSection = 'work';
      } else if (message === 'I have a question') {
        response =
          "<p class='index-0'>Sure! I can help you with questions about my services, projects, or anything related to web development. What would you like to know?</p><p class='index-1'>I've worked on various exciting projects from e-commerce platforms to AI-driven applications, and even created custom CMS solutions. Feel free to ask about my <b>portfolio</b>, <b>work experience</b>, or even my <b>interests</b> like music and photography that influence my creative process!</p>";
        navigateToSection = null;
      } else if (
        message === 'Tell me more about you' ||
        message.toLowerCase().includes('introduction') ||
        message.toLowerCase().includes('introduction about you') ||
        message.toLowerCase().includes('introduction about me') ||
        message.toLowerCase().includes('introduction about yourself') ||
        message.toLowerCase().includes('introduce about me') ||
        message.toLowerCase().includes('introduce about yourself') ||
        message.toLowerCase().includes('introduce about me') ||
        message.toLowerCase().includes('tell me more about') ||
        message.toLowerCase().includes('tell me more about yourself') ||
        message.toLowerCase().includes('about me') ||
        message.toLowerCase().includes('about yourself') ||
        message.toLowerCase().includes('talk about you') ||
        message.toLowerCase().includes('talk about yourself') ||
        message.toLowerCase().includes('about you')
      ) {
        response =
          "<p class='index-0'>As a <b>detail-oriented developer</b>, I enjoy crafting elegant, efficient web solutions that not only delight users but also help businesses grow.</p><p class='index-1'>With deep experience in <b>React</b>, <b>Next.js</b>, <b>TypeScript</b>, and <b>Tailwind CSS</b>, I approach development with both <b>product thinking</b> and <b>commercial awareness</b>, making sure every technical decision aligns with the bigger picture.</p><p class='index-2'>I'm passionate about <b>UX/UI design</b> and love bringing pixel-perfect ideas to life—building responsive, high-quality applications that feel smooth across any device. By blending <b>structured thinking</b> with <b>creative problem-solving</b>, I help turn complex requirements into practical, scalable solutions.</p><p class='index-3'>Whether collaborating with cross-functional teams or taking the lead on projects, I focus on writing <b>clean, maintainable code</b> that drives better engagement, performance, and results.</p><p class='index-4'>Would you like to learn more about my <a href='/services' onclick='event.preventDefault(); return false;' class='text-[#908f8c] underline'>services</a> or see some of my <a href='/work' onclick='event.preventDefault(); return false;' class='text-[#908f8c] underline'>recent projects</a>?</p>";
        navigateToSection = 'about';
      } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
        response = 'Hello! How can I help you today?';
      } else if (message.toLowerCase().includes('help')) {
        response =
          'I can help with information about services, projects, or scheduling a consultation. What would you like to know?';
      } else if (message.toLowerCase().includes('contact')) {
        response = 'You can reach out via the contact form or directly email at imavisma@gmail.com';
        navigateToSection = 'contact';
      } else if (message.toLowerCase().includes('service') || message.toLowerCase().includes('services')) {
        response =
          'I offer frontend development, backend & API solutions, digital marketing, and UX/UI design services. Would you like to know more about any specific service?';
        navigateToSection = 'services';
      } else if (message.toLowerCase().includes('about')) {
        response =
          'I am a full-stack developer with expertise in modern web technologies. I have a passion for creating beautiful, functional, and user-friendly applications.';
        navigateToSection = 'about';
      } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
        response =
          'Pricing depends on the specific project requirements. Would you like to schedule a consultation to discuss your project in detail?';
      } else if (
        message.toLowerCase().includes('hobby') ||
        message.toLowerCase().includes('hobbies') ||
        message.toLowerCase().includes('interests') ||
        message.toLowerCase().includes('interesting') ||
        message.toLowerCase().includes('personal')
      ) {
        response =
          "<p class='index-0'>Outside of coding, I'm an <b>music enthusiast</b> with a growing collection of digital playlists spanning classic and contemporary artists.</p><p class='index-1'>I also enjoy <b>covering popular songs</b> and sharing them with friends—singing has become my favorite way to unwind and relieve stress.</p><p class='index-2'>I've developed a passion for <b>photography</b> and am currently building my portfolio of urban landscapes and portrait photography.</p><p class='index-3'>In the past couple of years, I've found balance in my work-life through <b>caring for tropical plants</b> like White Princess Philodendrons and Monstera Deliciosas. There's something calming about nurturing these plants that helps me disconnect from screens and find perspective.</p><p class='index-4'>These creative outlets complement my technical work and help me bring fresh perspectives and balanced energy to my development projects.</p>";
        navigateToSection = null;
      } else {
        response = "Thanks for your message! I'll get back to you soon. Is there anything specific you'd like to know?";
      }
    }

    // 使用函数时:
    response = addIndexToParagraphs(response);

    // 确保对简单响应进行格式化
    if (response && !response.includes("<p class='index-")) {
      if (!response.includes('<p>')) {
        response = `<p class='index-0'>${response}</p>`;
      }
    }

    // 在响应前记录调试信息
    console.log('API响应:', {
      language,
      message,
      navigateToSection,
      responseLength: response.length,
    });

    return NextResponse.json({
      response,
      navigateToSection, // Return the section to navigate to
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat message' }, { status: 500 });
  }
}
