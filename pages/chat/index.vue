<template>
  <div class="space-y-8">
    <section class="hero-section bg-primary-light rounded-lg p-8 border-2 border-neon-blue">
      <div class="max-w-3xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-6 text-neon-blue">科幻游戏聊天群</h1>
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
      <div class="md:col-span-1 bg-primary-light p-4 rounded-lg neon-border">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-neon-blue">聊天频道</h3>
          <button class="text-neon-purple hover:text-neon-blue transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="space-y-2">
          <div v-for="(channel, index) in channels" :key="index" 
               class="p-2 rounded-md cursor-pointer transition-all hover:bg-secondary-dark"
               :class="{ 'bg-secondary-dark': activeChannel === index }"
               @click="activeChannel = index">
            <div class="flex items-center space-x-2">
              <div class="w-2 h-2 rounded-full" :class="channel.online ? 'bg-green-500' : 'bg-gray-500'"></div>
              <span class="font-medium">{{ channel.name }}</span>
              <span v-if="channel.unread" class="bg-neon-red text-white text-xs rounded-full px-2 py-0.5 ml-auto">
                {{ channel.unread }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 聊天内容区域 -->
      <div class="md:col-span-3 bg-primary-light p-4 rounded-lg neon-border flex flex-col h-[600px]">
        <div class="flex items-center space-x-2 p-2 border-b border-neon-blue/30 mb-4">
          <div class="w-3 h-3 rounded-full bg-green-500"></div>
          <h3 class="text-xl font-bold text-neon-blue">{{ channels[activeChannel]?.name || '公共频道' }}</h3>
          <span class="text-sm text-gray-400 ml-2">{{ channels[activeChannel]?.members || 0 }} 名成员</span>
        </div>

        <!-- 消息列表 -->
        <div class="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
          <div v-for="(message, index) in messages" :key="index" 
               class="flex items-start space-x-3"
               :class="{'justify-end': message.isMe}">
            <div v-if="!message.isMe" class="w-8 h-8 rounded-full bg-neon-purple flex items-center justify-center text-white font-bold">
              {{ message.sender.charAt(0) }}
            </div>
            <div class="max-w-[70%]">
              <div v-if="!message.isMe" class="text-sm text-gray-400 mb-1">{{ message.sender }}</div>
              <div class="p-3 rounded-lg" 
                   :class="message.isMe ? 'bg-neon-blue text-white rounded-tr-none' : 'bg-secondary-dark text-white rounded-tl-none'">
                {{ message.text }}
              </div>
              <div class="text-xs text-gray-400 mt-1 flex justify-between">
                <span>{{ message.time }}</span>
                <span v-if="message.isMe" class="text-neon-blue" v-show="message.read">已读</span>
              </div>
            </div>
            <div v-if="message.isMe" class="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold">
              我
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="border-t border-neon-blue/30 pt-4">
          <div class="flex items-center space-x-2">
            <button class="text-neon-purple hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button class="text-neon-purple hover:text-neon-blue transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <input type="text" placeholder="输入消息..." 
                   class="flex-1 bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue" 
                   v-model="newMessage" 
                   @keyup.enter="sendMessage" />
            <button class="bg-neon-blue hover:bg-neon-purple text-white rounded-full p-2 transition-colors"
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
</style>