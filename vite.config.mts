/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), createBlockletPlugin(), svgr()],
    build: {
      // 禁止 preload 可以解决 js 的请求没有 referer 的问题
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    css: {
      modules: {
        mode: 'local', // 启用模块化
        generateScopedName: '[name]__[local]--[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
        },
      },
      devSourcemap: true,
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 16, 
            // 需要转换的属性，除 border 外所有px 转 rem
            propList: ['*', "!border","!max-width","!min-width"], 
            selectorBlackList: ['norem'], // 过滤掉norem-开头的class，不进行rem转换
            replace: true, // 直接更换成rem
            mediaQuery: true, // 是否要在媒体查询中转换px
            minPixelValue: 2 // 设置要转换的最小像素值
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
