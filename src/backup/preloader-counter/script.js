document.addEventListener('DOMContentLoaded', () => {
    // 等待整个文档加载完成后执行内部代码

    const windowWidth = window.innerWidth;
    // 获取浏览器窗口的宽度，用于计算动画位置

    const wrapperWidth = 170;
    // 设置每个数字容器的宽度为170像素

    const finalPosition = windowWidth - wrapperWidth;
    // 计算动画的最终位置：窗口宽度减去容器宽度，确保数字容器不会超出屏幕

    const stepDistance = finalPosition / 5.5;
    // 计算每步移动的距离：总移动距离除以5.5，创建均匀的移动步骤

    const tl = gsap.timeline();
    // 创建GSAP时间线，用于编排和管理连续的动画序列

    // 初始动画：将所有数字向左移动到起始位置
    tl.to('.count', {
        x: -900,            // 向左移动900像素（隐藏初始数字）
        duration: 0.85,     // 动画持续0.85秒
        delay: 0.5,         // 延迟0.5秒开始动画
        ease: 'power4.inOut', // 使用power4.inOut缓动效果，缓入缓出
    });

    // 创建9个连续的动画步骤，每步显示不同的数字
    for (let i = 0; i < 9; i++) {
        const xPosition = -900 + i * 180;
        // 计算每步的X位置：从-900开始，每步增加180像素（每个数字宽度）

        tl.to('.count', {
            x: xPosition,       // 移动到计算出的位置，展示不同数字
            duration: 0.85,     // 动画持续0.85秒
            ease: 'power4.inOut', // 使用平滑的缓动效果
            onStart: () => {
                // 每次数字改变动画开始时同步移动数字容器
                gsap.to('.count-wrapper', {
                    x: stepDistance * i,  // 容器向右移动，根据当前步骤计算距离
                    duration: 0.85,       // 与数字动画相同的持续时间
                    ease: 'power4.inOut', // 相同的缓动效果保持一致性
                });
            }
        });
    }

    // 设置所有revealer元素（星形过渡效果）的初始状态为不可见
    gsap.set('.revealer svg', { scale: 0 });

    // 定义三个revealer的延迟时间，创造连续的过渡效果
    const delays = [6, 6.5, 7];

    // 为每个revealer元素创建放大动画
    document.querySelectorAll('.revealer svg').forEach((el, i) => {
        gsap.to(el, {
            scale: 65,           // 放大到25倍原始大小，覆盖整个屏幕
            duration: 1.5,       // 放大动画持续1.5秒
            ease: 'power4.inOut', // 使用缓动效果
            delay: delays[i],    // 使用预定义的延迟，依次触发
            onComplete: () => {
                // 当最后一个revealer动画完成时
                if (i === delays.length - 1) {
                    document.querySelector('.loader').remove();
                    // 移除整个loader元素，显示主页面内容
                }
            }
        });
    });

    // 设置页面标题的动画
    gsap.to('.header h1', {
        onStart: () => {
            // 标题动画开始时，同时触发其他元素的动画

            // 显示切换按钮
            gsap.to('.toggle-btn', {
                scale: 1,           // 从0缩放到1（正常大小）
                duration: 1,        // 持续1秒
                ease: 'power4.inOut', // 平滑的缓动
            });

            // 显示文本行，创造打字机效果
            gsap.to('.line p', {
                y: 0,               // 从下方移动到原位
                duration: 1,        // 持续1秒
                stagger: 0.1,       // 每行之间延迟0.1秒，创造逐行出现效果
                ease: 'power3.out', // 缓动效果
            });
        },
        rotateY: 0,           // 从初始旋转状态恢复到正常角度
        duration: 2,          // 持续2秒（注意这里覆盖了前面的duration: 1）
        ease: 'power3.out',   // 平滑的缓出效果
        delay: 8,             // 在数字动画和revealer后延迟8秒执行
    });
});