

/**
 * 判断是否移动端
 * @returns RegExpMatchArray | null
 */
export const isMobileDevice = () => {
    return navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ) ? true : false;
}