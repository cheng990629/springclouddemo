import React, { useState, useEffect, useRef } from 'react';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css }) => ({
    // 容器：相对定位，居中
    container: css`
        position: relative;
        display: inline-flex;
        align-items: center;
        height: 60px;
        font-family: 'PingFang SC', -apple-system, BlinkMacSystemFont, sans-serif;

        @media (max-height: 1100px) {
            height: 48px !important;
        }
    `,

    // 测量层：不可见，不换行，用于获取真实宽度
    textMeasure: css`
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 1px;
        opacity: 0;
        pointer-events: none;
        z-index: -1;

        @media (max-height: 1100px) {
            font-size: 30px !important;
            letter-spacing: 0.8px !important;
        }
    `,

    // 视窗：控制可见区域
    textViewport: css`
        overflow: hidden;
        white-space: nowrap;
        will-change: width;
        transition: width 0.1s linear;
    `,

    // 文本样式
    textContent: css`
        display: inline-block;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #000;
        padding-right: 4px;

        @media (max-height: 1100px) {
            font-size: 30px !important;
            letter-spacing: 0.8px !important;
        }
    `,

    // 智能光标系统
    smartCursor: css`
        position: absolute;
        left: 0;
        top: 50%;
        width: 0;
        height: 0;
        pointer-events: none;
        z-index: 10;
        transition: transform 0.1s linear;
    `,

    // 光标图标
    cursorCore: css`
        position: absolute;
        top: -20px;
        left: 4px;
        width: 20px;
        height: 20px;
        color: #6366f1;
        filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));

        @media (max-height: 1100px) {
            width: 16px !important;
            height: 16px !important;
            top: -16px !important;
            left: 3px !important;
        }
    `,

    // 拖尾特效 (彗星尾巴)
    cursorTrail: css`
        position: absolute;
        top: -1px;
        right: -4px;
        width: 60px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.8), transparent);
        transform: translateX(-100%);
        transition: opacity 0.2s;

        @media (max-height: 1100px) {
            width: 48px !important;
            height: 1.6px !important;
        }
    `,

    // 光标辉光背景
    cursorGlow: css`
        position: absolute;
        top: -20px;
        left: -10px;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%);
        transition: opacity 0.2s;

        @media (max-height: 1100px) {
            width: 32px !important;
            height: 32px !important;
            top: -16px !important;
            left: -8px !important;
        }
    `,

    // 等待时：光标闪烁，隐藏拖尾
    isBlinking: css`
        .cursor-core {
            animation: blink 1s step-end infinite;
        }
    `,
}));

// 全局动画样式
const globalStyles = `
@keyframes blink {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
}

.cursor-icon {
    width: 100%;
    height: 100%;
}
`;

const SloganAnimation: React.FC = () => {
    const { styles } = useStyles();
    const [currentText, setCurrentText] = useState('');
    const [viewportWidth, setViewportWidth] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasCompletedCycle, setHasCompletedCycle] = useState(false);

    const measureRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const introTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hasInitialized = useRef(false);

    const slogans = [
        '让创造，自然发生',
        '归于人本，焕新服务',
        '珍酒城AGI：极简核心枢纽'
    ];

    // 测量当前文本如果不折行，实际占用的像素宽度
    const getRealWidth = () => {
        if (!measureRef.current) return 0;
        return measureRef.current.scrollWidth;
    };

    // 打字动效
    const typeText = async () => {
        if (!isAnimating) return;

        setIsTyping(true);
        setIsDeleting(false);

        const fullText = slogans[activeIndex];
        setCurrentText('');
        setViewportWidth(0);

        // 逐字追加
        for (let i = 1; i <= fullText.length; i++) {
            if (!isAnimating) return; // 检查动画是否被中断

            await new Promise(resolve => setTimeout(resolve, 40 + Math.random() * 20));

            setCurrentText(fullText.slice(0, i));

            // 等待 DOM 更新后测量新宽度
            setTimeout(() => {
                if (isAnimating) {
                    setViewportWidth(getRealWidth());
                }
            }, 0);
        }

        setIsTyping(false);

        // 停顿后删除
        if (isAnimating) {
            timerRef.current = setTimeout(deleteText, 1500);
        }
    };

    // 删除动效 (反向)
    const deleteText = async () => {
        if (!isAnimating) return;

        setIsDeleting(true);
        setIsTyping(true); // 删除时也算运动状态，保持光标对齐

        const fullText = currentText;

        for (let i = fullText.length; i >= 0; i--) {
            if (!isAnimating) return; // 检查动画是否被中断

            await new Promise(resolve => setTimeout(resolve, 40));

            setCurrentText(fullText.slice(0, i));

            setTimeout(() => {
                if (isAnimating) {
                    setViewportWidth(getRealWidth());
                }
            }, 0);
        }

        setIsDeleting(false);
        setIsTyping(false);

        // 切换到下一个词或回到普通文本
        if (isAnimating) {
            timerRef.current = setTimeout(() => {
                if (isAnimating) {
                    const nextIndex = (activeIndex + 1) % slogans.length;
                    if (nextIndex === 0) {
                        // 完成一轮循环，回到普通文本
                        setHasCompletedCycle(true);
                        setIsAnimating(false);
                        setShowIntro(true);
                    } else {
                        // 继续下一个slogan
                        setActiveIndex(nextIndex);
                    }
                }
            }, 300); // 短暂停顿后再切换
        }
    };

    useEffect(() => {
        // 注入全局样式
        const existingStyle = document.getElementById('slogan-global-styles');
        if (!existingStyle) {
            const style = document.createElement('style');
            style.id = 'slogan-global-styles';
            style.textContent = globalStyles;
            document.head.appendChild(style);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            if (introTimerRef.current) {
                clearTimeout(introTimerRef.current);
            }
        };
    }, []);

    // 处理引导语到动画的切换
    useEffect(() => {
        if (showIntro && !hasCompletedCycle) {
            // 初始引导语：2.5秒后隐藏引导语，开始slogan动画
            introTimerRef.current = setTimeout(() => {
                setShowIntro(false);
                setIsAnimating(true);
            }, 2500);
        } else if (!showIntro && !isAnimating && !hasCompletedCycle) {
            // 开始第一次动画
            setIsAnimating(true);
            typeText();
        }
        // 如果hasCompletedCycle为true，保持showIntro=true，不启动定时器
    }, [showIntro, isAnimating, hasCompletedCycle]);

    // 监听 activeIndex 变化，继续动画循环
    useEffect(() => {
        if (isAnimating && !showIntro && hasInitialized.current && !hasCompletedCycle) {
            typeText();
        }
        hasInitialized.current = true;
    }, [activeIndex, isAnimating, showIntro, hasCompletedCycle]);


    return (
        <div className={styles.container}>
            {showIntro ? (
                // 引导语显示
                <div
                    key={hasCompletedCycle ? 'completed' : 'initial'}
                    className="slogan-text"
                    style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: '#000',
                        textAlign: 'center',
                        animation: 'fadeIn 1s ease-in-out'
                    }}
                >
                    让复杂变简单
                </div>
            ) : (
                <>
                    {/* 测量层：不可见，不换行，用于获取真实宽度 */}
                    <div ref={measureRef} className={styles.textMeasure} aria-hidden="true">
                        {currentText}
                    </div>

                    {/* 视窗：控制可见区域 */}
                    <div className={styles.textViewport} style={{ width: `${viewportWidth}px` }}>
                        <span className={`${styles.textContent} slogan-animation-text`}>
                            {currentText}
                        </span>
                    </div>

                    {/* 智能光标 */}
                    <div
                        className={`${styles.smartCursor} ${!isTyping && !isDeleting ? styles.isBlinking : ''}`}
                        style={{ transform: `translateX(${viewportWidth}px)` }}
                    >
                        <div className={styles.cursorCore}>
                            <svg viewBox="0 0 24 24" className="cursor-icon">
                                <path
                                    fill="currentColor"
                                    d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                                />
                            </svg>
                        </div>
                        <div
                            className={styles.cursorTrail}
                            style={{ opacity: isTyping ? 1 : 0 }}
                        ></div>
                        <div
                            className={styles.cursorGlow}
                            style={{ opacity: isTyping ? 1 : 0 }}
                        ></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SloganAnimation;