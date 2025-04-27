'use client';

import { useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

import Card from '@/components/common/Card';

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  id: number;
  frontSrc: string;
  frontAlt: string;
  title: string;
  description: string;
  services: string[];
  stacks?: string;
  tools?: string;
}

const CARDS_DATA: CardData[] = [
  {
    id: 1,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Frontend Development',
    title: 'Frontend Development',
    description: 'Modern, responsive web experiences with pixel-perfect UI',
    services: [
      'React & Next.js Apps',
      'TypeScript Integration',
      'Responsive Interfaces',
      'Performance Optimization',
      'Interactive Animations',
    ],
    stacks: 'React, Next.js, TypeScript, TailwindCSS, ShadcnUI, GSAP, Cursor, MCP',
  },
  {
    id: 2,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Backend & API Solutions',
    title: 'Backend & API Solutions',
    description: 'Robust APIs, CMS integration & server-side functionality',
    services: ['REST & GraphQL APIs', 'Database Design', 'Headless CMS', 'Serverless Functions', 'Auth Systems'],
    stacks: 'Node.js, Express, MongoDB, Strapi, Contentful, Firebase, AWS Lambda',
  },
  {
    id: 3,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'Digital Marketing',
    title: 'Digital Marketing',
    description: 'Data-driven strategies to boost online visibility & growth',
    services: ['SEO Optimization', 'Social Media Marketing', 'Google Ads', 'Content Creation', 'Analytics & Reporting'],
    tools: 'Google Analytics, Google Ads, Pagespeed Insights, SEMrush',
  },
  {
    id: 4,
    frontSrc: '/images/cover-card.svg',
    frontAlt: 'UX/UI Design',
    title: 'UX/UI Design',
    description: 'Intuitive, user-centered interfaces with modern aesthetics',
    services: ['User Research', 'Wireframing', 'Interaction Design', 'Design Systems', 'AI-powered 10px precision'],
    tools: 'Figma, Storybook, Relume',
  },
];

// 桌面端 - 水平位置分布 (X轴)
const POSITIONS = [20, 40, 60, 80];

// 移动端 - 垂直位置分布 (Y轴)
const MOBILE_Y_POSITIONS = [15, 35, 55, 75]; // 垂直从上到下分布

// 桌面端 - 旋转角度
const ROTATIONS = [-8, -4, 4, 8];

// 移动端 - 旋转角度，稍微小一些但保持方向一致
const MOBILE_ROTATIONS = [-4, -2, 2, 4];

export default function Services() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  // 添加一个ref来跟踪ScrollTrigger实例
  const triggerRefs = useRef<ScrollTrigger[]>([]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 清理所有ScrollTrigger实例的函数
  const clearTriggers = () => {
    triggerRefs.current.forEach(trigger => {
      if (trigger) trigger.kill();
    });
    triggerRefs.current = [];
  };

  useGSAP(
    () => {
      const containerEl = container.current;
      if (!containerEl) return;

      const cardsSection = containerEl.querySelector('.cards');
      if (!cardsSection) return;

      // 先清理所有现有触发器
      clearTriggers();

      const titleSection = containerEl.querySelector('.title-section');
      const titleElement = titleSection?.querySelector('h1');
      const descriptionElement = titleSection?.querySelector('p');

      // Fade-in/Fade-out animation for title section
      if (titleSection && titleElement && descriptionElement) {
        gsap.set([titleElement, descriptionElement], {
          opacity: 0,
          y: 30,
        });

        // Title element animation
        gsap.fromTo(
          titleElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleSection,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              markers: false,
            },
          }
        );

        // Description element animation with slight delay
        gsap.fromTo(
          descriptionElement,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: titleSection,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              markers: false,
            },
          }
        );
      }

      // // Fade-in/Fade-out for cards section container
      // gsap.fromTo(
      //   cardsSection,
      //   { opacity: 0, y: 30 },
      //   {
      //     opacity: 1,
      //     y: 0,
      //     duration: 0.8,
      //     delay: 0.3,
      //     ease: 'power2.out',
      //     scrollTrigger: {
      //       trigger: cardsSection,
      //       start: 'top 80%',
      //       end: 'bottom 20%',
      //       toggleActions: 'play reverse play reverse',
      //       markers: false,
      //     },
      //   }
      // );

      const cards = cardRefs.current.filter(Boolean);

      // 将移动端和桌面端的动画完全分开处理
      if (isMobile) {
        console.log('Setting up mobile animations');

        // 初始状态 - 所有卡片堆叠在顶部
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          // 初始位置设置
          gsap.set(card, {
            left: '50%',          // 水平居中
            top: '15%',           // 初始都在顶部位置
            xPercent: -50,        // 水平居中
            yPercent: -50,        // 垂直居中
            rotation: MOBILE_ROTATIONS[index],  // 保持旋转角度
            scale: 0.85,          // 缩小比例
            opacity: 1,           // 完全不透明
          });

          // 设置初始翻转状态
          gsap.set(frontEl, { rotationY: 0 });
          gsap.set(backEl, { rotationY: 180 });
        });

        // 第一步：当进入标题区域，立即展开卡片位置
        const expandTrigger = ScrollTrigger.create({
          trigger: titleSection,  // 以标题区域为触发点
          start: 'top 60%',       // 当标题接近视图中部
          end: 'bottom top',      // 当标题离开顶部
          once: true,             // 只触发一次
          onEnter: () => {
            // 立即展开所有卡片到最终位置
            cards.forEach((card, index) => {
              if (!card) return;

              gsap.to(card, {
                top: `${MOBILE_Y_POSITIONS[index]}%`,  // 直接到目标位置
                rotation: MOBILE_ROTATIONS[index],     // 应用旋转
                duration: 0.5,                         // 快速展开
                ease: 'power2.out',
                delay: index * 0.1,                    // 轻微延迟，形成连锁效果
              });
            });
          }
        });

        triggerRefs.current.push(expandTrigger);

        // 第二步：逐个卡片翻转
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          // 为每张卡片创建翻转触发器
          const flipTrigger = ScrollTrigger.create({
            trigger: card,                 // 以卡片为触发点
            start: 'top center',           // 当卡片顶部到达视图中心
            end: 'center center-=50',      // 当卡片中心略微超过视图中心
            scrub: 0.5,                    // 平滑翻转
            onEnter: () => {
              // 使用延时实现逐一翻转效果
              gsap.to(frontEl, {
                rotationY: 180,
                duration: 0.8,
                delay: 0.1,                // 短暂延迟，让翻转看起来更自然
                ease: 'power2.inOut',
              });
              gsap.to(backEl, {
                rotationY: 0,
                duration: 0.8,
                delay: 0.1,
                ease: 'power2.inOut',
              });

              // 翻转时略微放大
              gsap.to(card, {
                scale: 0.9,
                duration: 0.8,
                delay: 0.1,
                ease: 'power2.out',
              });
            },
            onLeaveBack: () => {
              // 往回滚动时翻回正面
              gsap.to(frontEl, {
                rotationY: 0,
                duration: 0.6,
                ease: 'power2.inOut',
              });
              gsap.to(backEl, {
                rotationY: 180,
                duration: 0.6,
                ease: 'power2.inOut',
              });

              // 恢复原始大小
              gsap.to(card, {
                scale: 0.75,
                duration: 0.6,
                ease: 'power2.out',
              });
            }
          });

          triggerRefs.current.push(flipTrigger);
        });

        // 第三步：在离开服务区域底部时，所有卡片回缩
        const retractTrigger = ScrollTrigger.create({
          trigger: cardsSection,
          start: 'bottom bottom',        // 当区域底部刚好到达视图底部
          end: 'bottom+=50% bottom',     // 延长结束点，给更多回缩空间
          scrub: 0.8,                    // 更平滑的过渡
          onUpdate: (self) => {
            const progress = self.progress;

            // 只有真正开始离开视图时才开始回缩
            if (progress > 0) {
              // 回缩所有卡片，增加延迟形成连锁效果
              cards.forEach((card, index) => {
                if (!card) return;

                // 添加索引相关的延迟，让卡片按顺序回缩
                const delay = index * 0.05;

                gsap.to(card, {
                  top: '15%',                  // 回到顶部位置
                  rotation: MOBILE_ROTATIONS[index] * (1 - progress), // 逐渐减小旋转
                  scale: 0.75,                 // 回到初始大小
                  opacity: Math.max(0, 1 - progress * 1.5),  // 更慢的淡出
                  duration: 0.3,
                  delay: delay,                // 顺序回缩
                });
              });
            }
          }
        });

        triggerRefs.current.push(retractTrigger);
      } else {
        console.log('Setting up desktop animations');

        /* 桌面端动画 */
        // 初始状态 - 卡片堆叠在中央
        cards.forEach((card) => {
          gsap.set(card, {
            left: '50%',
            top: '20%',
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            clearProps: 'all',  // 清除之前可能应用的属性
          });
        });

        // 为每张卡片创建主时间线
        cards.forEach((card, index) => {
          const frontEl = card?.querySelector('.flip-card-front');
          const backEl = card?.querySelector('.flip-card-back');

          if (!frontEl || !backEl || !card) return;

          const trigger = ScrollTrigger.create({
            trigger: cardsSection,
            start: 'top bottom-=10%',
            end: 'bottom top+=10%',
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;

              // 定义动画阶段
              const spreadStart = 0.1;
              const spreadEnd = 0.3;
              const flipStart = 0.2;
              const flipEnd = 0.4;
              const reverseStart = 0.6;
              const reverseEnd = 0.8;

              // 计算阶段进度
              const spreadProgress = gsap.utils.clamp(0, 1, (progress - spreadStart) / (spreadEnd - spreadStart));
              const flipProgress = gsap.utils.clamp(0, 1, (progress - flipStart) / (flipEnd - flipStart));
              const reverseProgress = gsap.utils.clamp(0, 1, (progress - reverseStart) / (reverseEnd - reverseStart));

              // 扩散动画
              const currentPosition = gsap.utils.interpolate(50, POSITIONS[index], spreadProgress - reverseProgress);
              const currentRotation = gsap.utils.interpolate(0, ROTATIONS[index], spreadProgress - reverseProgress);

              // 应用扩散
              gsap.to(card, {
                left: `${currentPosition}%`,
                rotation: currentRotation,
                duration: 0.1,
              });

              // 翻转动画
              const frontRotation = -180 * (flipProgress - reverseProgress);
              const backRotation = 180 - 180 * (flipProgress - reverseProgress);

              gsap.to(frontEl, {
                rotationY: frontRotation,
                duration: 0.1,
              });
              gsap.to(backEl, {
                rotationY: backRotation,
                duration: 0.1,
              });
            },
          });

          // 存储触发器引用
          triggerRefs.current.push(trigger);
        });
      }

      // return () => {
      //   // 组件卸载时清理
      //   clearTriggers();
      // };
    },
    { scope: container, dependencies: [isMobile] }
  );

  return (
    <ReactLenis root>
      <section id="services"
        className="m-0 p-0 box-border mt-32 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12"
        ref={container}
      >
        {/* Title section - 30% of viewport height */}
        <div className="relative w-full h-[15vh] bg-[#efeee9] top-2/5 title-section">
          <h1
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 
                        text-center font-semibold font-baskervville tracking-wide text-lg lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3rem] leading-none text-[#333]
                        w-[90%] sm:w-[80%] md:w-[70%] lg:w-auto"
          >
            SERVICES WHAT I OFFER
          </h1>
          <p className="text-center text-xs sm:text-sm 2xl:text-base text-[#333]/60 pt-8 xl:pt-14 2xl:pt-16 mx-auto font-light px-0 lg:px-6">
            Elevating brands with AI-powered precision down to the last 10px. <br /> Fast delivery with zero compromise
            on quality guaranteed.
          </p>
        </div>

        {/* Cards section - adjust height for mobile */}
        <div className={`relative w-full ${isMobile ? 'h-[210vh]' : 'h-[65vh]'} bg-[#efeee9] cards`}>
          {CARDS_DATA.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              ref={(el: HTMLDivElement | null) => {
                cardRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </section>
    </ReactLenis>
  );
}
