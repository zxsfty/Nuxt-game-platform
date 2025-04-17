<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue relative overflow-hidden">
      <!-- 节气特定装饰元素 -->
      <div class="seasonal-pattern absolute inset-0 opacity-10" :class="`${$state.themeStyle.value}-pattern`"></div>
      
      <!-- 白露特效：露珠效果 -->
      <div v-if="$state.themeStyle.value === 'bailu'" class="dew-drops-container"></div>
      
      <!-- 寒露特效：秋叶飘落 -->
      <div v-if="$state.themeStyle.value === 'hanlu'" class="falling-leaves-container"></div>
      
      <!-- 小寒特效：雪花飘落 -->
      <div v-if="$state.themeStyle.value === 'xiaohan'" class="snowflakes-container"></div>
      
      <div class="max-w-3xl mx-auto text-center relative z-10">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue seasonal-text-glow">The broken with star sinks聊天</h1>
        <p class="text-xl mb-8">与其他玩家实时交流，组队探索未来世界</p>
        <div class="flex justify-center space-x-4">
          <button class="bg-neon-purple hover:bg-neon-blue text-white font-bold py-2 px-4 rounded-full transition-all">
            公共频道
          </button>
          <button class="bg-transparent hover:bg-neon-purple text-white font-bold py-2 px-4 rounded-full border border-neon-purple transition-all">
            私人消息
          </button>
        </div>
      </div>
    </section>

    <section class="chat-section grid grid-cols-1 md:grid-cols-4 gap-6">
      <!-- 聊天群列表 -->
      <div class="md:col-span-1 bg-primary-light p-4 rounded-lg neon-border relative overflow-hidden">
        <!-- 节气特定装饰元素 -->
        <div class="seasonal-pattern absolute inset-0 opacity-5" :class="`${$state.themeStyle.value}-pattern`"></div>
        
        <div class="flex justify-between items-center mb-4 relative z-10">
          <h3 class="text-xl font-bold text-neon-blue seasonal-text-glow" :class="`${$state.themeStyle.value}-text-glow`">聊天频道</h3>
          <button class="text-neon-purple hover:text-neon-blue transition-colors seasonal-icon-button" :class="`${$state.themeStyle.value}-icon-button`">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="space-y-2 relative z-10">
          <div v-for="(channel, index) in channels" :key="index" 
               class="p-2 rounded-md cursor-pointer transition-all hover:bg-secondary-dark relative overflow-hidden"
               :class="{ 
                 'bg-secondary-dark': activeChannel === index,
                 'bailu-channel-item': $state.themeStyle.value === 'bailu',
                 'hanlu-channel-item': $state.themeStyle.value === 'hanlu',
                 'xiaohan-channel-item': $state.themeStyle.value === 'xiaohan'
               }"
               @click="activeChannel = index">
            <!-- 节气特定装饰元素 -->
            <div v-if="activeChannel === index" class="absolute inset-0 opacity-20" :class="`${$state.themeStyle.value}-channel-decoration`"></div>
            <div class="flex items-center space-x-2 relative z-10">
              <div class="w-2 h-2 rounded-full" 
                   :class="[channel.online ? 'bg-green-500' : 'bg-gray-500', `${$state.themeStyle.value}-status-indicator`]"></div>
              <span class="font-medium" :class="activeChannel === index ? `${$state.themeStyle.value}-text` : ''">{{ channel.name }}</span>
              <span v-if="channel.unread" 
                    class="text-white text-xs rounded-full px-2 py-0.5 ml-auto seasonal-badge"
                    :class="`${$state.themeStyle.value}-badge`">
                {{ channel.unread }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 聊天内容区域 -->
      <div class="md:col-span-3 bg-primary-light p-4 rounded-lg neon-border flex flex-col h-[600px] relative overflow-hidden">
        <!-- 节气特定装饰元素 -->
        <div class="seasonal-pattern absolute inset-0 opacity-5" :class="`${$state.themeStyle.value}-pattern`"></div>
        
        <div class="flex items-center space-x-2 p-2 border-b border-neon-blue/30 mb-4 relative z-10">
          <div class="w-3 h-3 rounded-full bg-green-500" :class="`${$state.themeStyle.value}-status-indicator`"></div>
          <h3 class="text-xl font-bold text-neon-blue seasonal-text-glow" :class="`${$state.themeStyle.value}-text-glow`">{{ channels[activeChannel]?.name || '公共频道' }}</h3>
          <span class="text-sm text-gray-400 ml-2">{{ channels[activeChannel]?.members || 0 }} 名成员</span>
        </div>

        <!-- 消息列表 -->
        <div class="flex-1 overflow-y-auto space-y-4 mb-4 p-2 relative z-10">
          <div v-for="(message, index) in messages" :key="index" 
               class="flex items-start space-x-3"
               :class="{'justify-end': message.isMe}">
            <div v-if="!message.isMe" class="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white font-bold seasonal-avatar" :class="`${$state.themeStyle.value}-avatar`">
              {{ message.sender.charAt(0) }}
            </div>
            <div class="max-w-[70%]">
              <div v-if="!message.isMe" class="text-sm text-gray-400 mb-1">{{ message.sender }}</div>
              <div class="p-3 rounded-lg relative overflow-hidden" 
                   :class="{
                     'bg-neon-blue text-white rounded-tr-none': message.isMe,
                     'bg-secondary-dark text-white rounded-tl-none': !message.isMe,
                     'bailu-message': $state.themeStyle.value === 'bailu',
                     'hanlu-message': $state.themeStyle.value === 'hanlu',
                     'xiaohan-message': $state.themeStyle.value === 'xiaohan'
                   }">
                <!-- 节气特定装饰元素 -->
                <div v-if="$state.themeStyle.value === 'bailu'" class="absolute top-0 right-0 w-full h-full opacity-10 bailu-message-decoration"></div>
                <div v-if="$state.themeStyle.value === 'hanlu'" class="absolute top-0 right-0 w-full h-full opacity-10 hanlu-message-decoration"></div>
                <div v-if="$state.themeStyle.value === 'xiaohan'" class="absolute top-0 right-0 w-full h-full opacity-10 xiaohan-message-decoration"></div>
                <span class="relative z-10">{{ message.text }}</span>
              </div>
              <div class="text-xs text-gray-400 mt-1 flex justify-between">
                <span>{{ message.time }}</span>
                <span v-if="message.isMe" :class="`text-neon-blue ${$state.themeStyle.value}-text`" v-show="message.read">已读</span>
              </div>
            </div>
            <div v-if="message.isMe" class="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold seasonal-avatar" :class="`${$state.themeStyle.value}-avatar`">
              我
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="border-t border-neon-blue/30 pt-4 relative z-10" :class="`${$state.themeStyle.value}-input-area`">
          <div class="flex items-center space-x-2">
            <button class="text-neon-purple hover:text-neon-blue transition-colors seasonal-icon-button" :class="`${$state.themeStyle.value}-icon-button`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="text-neon-purple hover:text-neon-blue transition-colors seasonal-icon-button" :class="`${$state.themeStyle.value}-icon-button`">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input type="text" placeholder="输入消息..." 
                   class="flex-1 bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue seasonal-input" 
                   :class="`${$state.themeStyle.value}-input`"
                   v-model="newMessage" 
                   @keyup.enter="sendMessage" />
            <button class="bg-neon-blue hover:bg-neon-purple text-white rounded-full p-2 transition-colors seasonal-button"
                    :class="$state.themeStyle.value + '-button'"
                    @click="sendMessage">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useState } from 'nuxt/app';

// 使用Nuxt的useState来获取当前主题状态
const $state = {
  themeStyle: useState('themeStyle', () => 'bailu') // 默认为白露主题
}

// 聊天频道数据
const channels = ref([
  { name: '公共频道', online: true, unread: 0, members: 128 },
  { name: '游戏攻略', online: true, unread: 5, members: 64 },
  { name: '组队探险', online: true, unread: 0, members: 32 },
  { name: '科技讨论', online: false, unread: 0, members: 48 },
  { name: '休闲聊天', online: true, unread: 2, members: 96 },
]);

// 当前活跃频道
const activeChannel = ref(0);

// 消息数据
const messages = ref([
  { sender: '系统', text: '欢迎来到公共频道，请遵守聊天规则！', time: '今天 12:00', isMe: false, read: true },
  { sender: '星际旅行者', text: '有人在玩新出的星际探索游戏吗？', time: '今天 12:05', isMe: false, read: true },
  { sender: '量子猎手', text: '我刚开始玩，还在适应操作', time: '今天 12:07', isMe: false, read: true },
  { sender: '我', text: '我已经玩了一周了，可以带你们熟悉一下游戏机制', time: '今天 12:10', isMe: true, read: true },
  { sender: '星际旅行者', text: '太好了！什么时候有空？', time: '今天 12:12', isMe: false, read: true },
  { sender: '我', text: '今晚8点，我们可以在游戏里组队', time: '今天 12:15', isMe: true, read: true },
  { sender: '量子猎手', text: '我也来！', time: '今天 12:16', isMe: false, read: true },
]);

// 新消息输入
const newMessage = ref('');

// 发送消息方法
const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  
  // 添加新消息到列表
  messages.value.push({
    sender: '我',
    text: newMessage.value,
    time: '刚刚',
    isMe: true,
    read: false
  });
  
  // 清空输入框
  newMessage.value = '';
  
  // 模拟收到回复
  setTimeout(() => {
    messages.value.push({
      sender: '系统',
      text: '消息已发送到频道',
      time: '刚刚',
      isMe: false,
      read: true
    });
  }, 1000);
};
</script>

<style scoped>
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(var(--color-secondary-dark), 0.5);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(var(--color-neon-blue), 0.7);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--color-neon-purple), 0.7);
}

/* 节气主题消息样式 */
.bailu-message {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.3);
  border: 1px solid rgba(var(--decoration-color-2), 0.3);
}

.hanlu-message {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.4);
  border: 1px solid rgba(var(--decoration-color-2), 0.4);
}

.xiaohan-message {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.5);
  border: 1px solid rgba(var(--decoration-color-2), 0.5);
}

/* 节气消息装饰 */
.bailu-message-decoration {
  background: radial-gradient(circle at top right, rgba(var(--decoration-color-1), 0.8), transparent 70%);
}

.hanlu-message-decoration {
  background: linear-gradient(135deg, rgba(var(--decoration-color-1), 0.8), transparent 70%);
}

.xiaohan-message-decoration {
  background: radial-gradient(circle at center, rgba(var(--decoration-color-1), 0.8), transparent 70%);
}

/* 节气文本样式 */
.bailu-text {
  text-shadow: 0 0 3px rgba(var(--decoration-color-1), 0.6);
}

.hanlu-text {
  text-shadow: 0 0 3px rgba(var(--decoration-color-1), 0.7);
}

.xiaohan-text {
  text-shadow: 0 0 3px rgba(var(--decoration-color-1), 0.8);
}

/* 节气按钮样式 */
.seasonal-button {
  position: relative;
  overflow: hidden;
}

.bailu-button::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(var(--decoration-color-1), 0.4) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.bailu-button:hover::after {
  opacity: 0.6;
}

.hanlu-button::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(var(--decoration-color-1), 0.5) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hanlu-button:hover::after {
  opacity: 0.7;
}

.xiaohan-button::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: radial-gradient(circle, rgba(var(--decoration-color-1), 0.6) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.xiaohan-button:hover::after {
  opacity: 0.8;
}

/* 节气图标按钮 */
.seasonal-icon-button {
  position: relative;
  z-index: 1;
}

.bailu-icon-button {
  filter: drop-shadow(0 0 2px rgba(var(--decoration-color-1), 0.5));
}

.hanlu-icon-button {
  filter: drop-shadow(0 0 2px rgba(var(--decoration-color-1), 0.6));
}

.xiaohan-icon-button {
  filter: drop-shadow(0 0 2px rgba(var(--decoration-color-1), 0.7));
}

/* 节气输入框 */
.seasonal-input:focus {
  box-shadow: 0 0 0 2px rgba(var(--decoration-color-1), 0.3);
}

.bailu-input:focus {
  border-color: rgba(var(--decoration-color-1), 0.7);
}

.hanlu-input:focus {
  border-color: rgba(var(--decoration-color-1), 0.8);
}

.xiaohan-input:focus {
  border-color: rgba(var(--decoration-color-1), 0.9);
}

/* 节气频道列表样式 */
.bailu-channel-item {
  transition: all 0.3s ease;
}

.bailu-channel-item:hover {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.4);
}

.hanlu-channel-item {
  transition: all 0.3s ease;
}

.hanlu-channel-item:hover {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.5);
}

.xiaohan-channel-item {
  transition: all 0.3s ease;
}

.xiaohan-channel-item:hover {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.6);
}

/* 节气频道装饰 */
.bailu-channel-decoration {
  background: radial-gradient(circle at center, rgba(var(--decoration-color-1), 0.6), transparent 70%);
}

.hanlu-channel-decoration {
  background: linear-gradient(45deg, rgba(var(--decoration-color-1), 0.7), transparent 70%);
}

.xiaohan-channel-decoration {
  background: radial-gradient(ellipse at top, rgba(var(--decoration-color-1), 0.8), transparent 70%);
}

/* 节气状态指示器 */
.bailu-status-indicator {
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.5);
}

.hanlu-status-indicator {
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.6);
}

.xiaohan-status-indicator {
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.7);
}

/* 节气未读消息徽章 */
.seasonal-badge {
  position: relative;
  overflow: hidden;
}

.bailu-badge {
  background-color: rgba(var(--color-neon-red), 0.8);
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.4);
}

.hanlu-badge {
  background-color: rgba(var(--color-neon-red), 0.8);
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.5);
}

.xiaohan-badge {
  background-color: rgba(var(--color-neon-red), 0.8);
  box-shadow: 0 0 4px rgba(var(--decoration-color-1), 0.6);
}

/* 节气头像样式 */
.seasonal-avatar {
  position: relative;
  overflow: hidden;
}

.bailu-avatar {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.5);
  border: 1px solid rgba(var(--decoration-color-2), 0.3);
}

.hanlu-avatar {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.6);
  border: 1px solid rgba(var(--decoration-color-2), 0.4);
}

.xiaohan-avatar {
  box-shadow: 0 0 8px rgba(var(--decoration-color-1), 0.7);
  border: 1px solid rgba(var(--decoration-color-2), 0.5);
}

/* 节气输入区域 */
.bailu-input-area {
  border-top-color: rgba(var(--decoration-color-1), 0.4);
}

.hanlu-input-area {
  border-top-color: rgba(var(--decoration-color-1), 0.5);
}

.xiaohan-input-area {
  border-top-color: rgba(var(--decoration-color-1), 0.6);
}
</style>