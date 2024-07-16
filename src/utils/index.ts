

/**
 * 判断是否移动端
 * @returns boolean
 */
export const isMobileDevice = (): boolean => {
    return navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    ) ? true : false;
}