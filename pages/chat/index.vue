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

        <!-- 在线用户列表 -->
        <div class="mt-6 pt-4 border-t border-neon-blue/30 relative z-10">
          <h3 class="text-lg font-bold text-neon-blue mb-3 seasonal-text-glow" :class="`${$state.themeStyle.value}-text-glow`">在线用户</h3>
          <div class="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            <div v-for="(user, index) in onlineUsers" :key="index" 
                 class="flex items-center space-x-2 p-2 rounded-md hover:bg-secondary-dark transition-all"
                 :class="[
                   `${$state.themeStyle.value}-user-item`,
                   user.gameStyle ? `${user.gameStyle}-user-item` : ''
                 ]">
              <div class="relative">
                <SeasonalImage 
                  :src="user.avatar" 
                  :alt="user.name"
                  :fallback-src="`https://via.placeholder.com/32?text=${user.name.charAt(0)}`"
                  image-class="w-8 h-8 rounded-full object-cover border-2"
                  :class="`${$state.themeStyle.value}-avatar-border`"
                  :error-text="''"
                />
                <div class="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-primary-light"></div>
              </div>
              <div>
                <div class="text-sm font-medium">{{ user.name }}</div>
                <div class="text-xs text-gray-400">{{ user.status }}</div>
              </div>
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
        <div class="flex-1 overflow-y-auto space-y-4 mb-4 p-2 relative z-10" ref="messageContainer">
          <div v-for="(message, index) in messages" :key="index" 
               class="flex items-start space-x-3"
               :class="{'justify-end': message.isMe}">
            <div v-if="!message.isMe" class="relative">
              <SeasonalImage 
                v-if="message.avatar"
                :src="message.avatar" 
                :alt="message.sender"
                :fallback-src="`https://via.placeholder.com/40?text=${message.sender.charAt(0)}`"
                image-class="w-10 h-10 rounded-full object-cover"
                :class="`${$state.themeStyle.value}-avatar`"
                :error-text="''"
              />
              <div v-else class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold seasonal-avatar" 
                   :class="[`${$state.themeStyle.value}-avatar`, message.gameStyle ? `${message.gameStyle}-avatar` : '']">
                {{ message.sender.charAt(0) }}
              </div>
              <div v-if="message.gameStyle" class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" :class="`${message.gameStyle}-badge`">
                <span v-if="message.gameStyle === 'wuthering'" class="text-[8px]">鸣</span>
                <span v-if="message.gameStyle === 'arknights'" class="text-[8px]">明</span>
              </div>
            </div>
            <div class="max-w-[70%]">
              <div v-if="!message.isMe" class="text-sm text-gray-400 mb-1 flex items-center">
                <span>{{ message.sender }}</span>
                <span v-if="message.gameStyle" class="ml-1 text-xs px-1 rounded" :class="`${message.gameStyle}-tag`">
                  {{ message.gameStyle === 'wuthering' ? '鸣潮' : message.gameStyle === 'arknights' ? '明日方舟' : '' }}
                </span>
              </div>
              <div class="p-3 rounded-lg relative overflow-hidden" 
                   :class="{
                     'bg-neon-blue text-white rounded-tr-none': message.isMe,
                     'bg-secondary-dark text-white rounded-tl-none': !message.isMe,
                     'bailu-message': $state.themeStyle.value === 'bailu',
                     'hanlu-message': $state.themeStyle.value === 'hanlu',
                     'xiaohan-message': $state.themeStyle.value === 'xiaohan',
                     'wuthering-message': message.gameStyle === 'wuthering',
                     'arknights-message': message.gameStyle === 'arknights'
                   }">
                <!-- 节气特定装饰元素 -->
                <div v-if="$state.themeStyle.value === 'bailu'" class="absolute top-0 right-0 w-full h-full opacity-10 bailu-message-decoration"></div>
                <div v-if="$state.themeStyle.value === 'hanlu'" class="absolute top-0 right-0 w-full h-full opacity-10 hanlu-message-decoration"></div>
                <div v-if="$state.themeStyle.value === 'xiaohan'" class="absolute top-0 right-0 w-full h-full opacity-10 xiaohan-message-decoration"></div>
                <!-- 游戏特定装饰元素 -->
                <div v-if="message.gameStyle === 'wuthering'" class="absolute top-0 right-0 w-full h-full opacity-15 wuthering-message-decoration"></div>
                <div v-if="message.gameStyle === 'arknights'" class="absolute top-0 right-0 w-full h-full opacity-15 arknights-message-decoration"></div>
                <span class="relative z-10">{{ message.text }}</span>
              </div>
              <div class="text-xs text-gray-400 mt-1 flex justify-between items-center">
                <span>{{ message.time }}</span>
                <div class="flex items-center space-x-1">
                  <button @click="reactToMessage(index)" 
                          class="transition-colors seasonal-icon-button p-1 rounded-full" 
                          :class="[
                            message.likedByMe ? `text-red-500 ${$state.themeStyle.value}-reaction-button-active` : `text-gray-500 hover:text-red-500 ${$state.themeStyle.value}-reaction-button`,
                            `${$state.themeStyle.value}-icon-button`
                          ]">
                     <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" :fill="message.likedByMe ? 'currentColor' : 'none'" stroke="currentColor">
                       <path stroke-linecap="round" stroke-linejoin="round" :stroke-width="message.likedByMe ? 0 : 2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <span v-if="message.reactions > 0" class="text-xs font-medium" :class="`${$state.themeStyle.value}-reaction-count`">{{ message.reactions }}</span>
                  <span v-if="message.isMe" :class="`text-neon-blue ${$state.themeStyle.value}-text`" v-show="message.read">已读</span>
                </div>
              </div>
            </div>
            <div v-if="message.isMe" class="relative">
              <div class="w-10 h-10 rounded-full bg-neon-blue flex items-center justify-center text-white font-bold seasonal-avatar" :class="`${$state.themeStyle.value}-avatar`">
                我
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center player-badge">
                <span class="text-[8px]">玩</span>
              </div>
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
            <div class="relative flex-1">
              <input type="text" placeholder="输入消息..." 
                     class="w-full bg-secondary-dark border border-neon-blue/30 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue seasonal-input pr-20" 
                     :class="`${$state.themeStyle.value}-input`"
                     v-model="newMessage" 
                     @keyup.enter="sendMessage" />
              <div class="absolute right-3 top-1/2 -translate-y-1/2 flex space-x-1">
                <button v-for="(style, index) in gameStyles" :key="index"
                        class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform hover:scale-110"
                        :class="`${style.value}-quick-button`"
                        :title="`以 ${style.label === '鸣' ? '鸣潮' : '明日方舟'} 风格发送`"
                        @click="sendWithStyle(style.value)">
                  {{ style.label }}
                </button>
              </div>
            </div>
            <button class="bg-neon-blue hover:bg-neon-purple text-white rounded-full p-2 transition-colors seasonal-button"
                    :class="$state.themeStyle.value + '-button'"
                    @click="sendMessage">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
          <!-- Typing Indicator -->
          <div v-if="typingUser" class="text-xs text-gray-400 mt-1 pl-10 italic" :class="`${$state.themeStyle.value}-text`">
            {{ typingUser }} 正在输入...
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { useState } from 'nuxt/app';
import SeasonalImage from '~/components/SeasonalImage.vue';

// 使用Nuxt的useState来获取当前主题状态
const themeStyle = useState('themeStyle', () => 'bailu'); // 默认为白露主题
const $state = {
  themeStyle
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

// 游戏风格选项
const gameStyles = ref([
  { label: '鸣', value: 'wuthering' },
  { label: '明', value: 'arknights' }
]);

// 在线用户数据
const onlineUsers = ref([
  { 
    name: '深海猎人', 
    status: '游戏中：鸣潮', 
    avatar: '/assets/images/games/wuthering-waves-icon.svg',
    gameStyle: 'wuthering'
  },
  { 
    name: '源石术师', 
    status: '在线', 
    avatar: '/assets/images/games/arknights-icon.svg',
    gameStyle: 'arknights'
  },
  { 
    name: '星际旅行者', 
    status: '游戏中：星际探索', 
    avatar: ''
  },
  { 
    name: '量子猎手', 
    status: '离开', 
    avatar: ''
  },
  { 
    name: '深蓝档案员', 
    status: '游戏中：鸣潮', 
    avatar: '/assets/images/games/wuthering-waves-blue.svg',
    gameStyle: 'wuthering'
  },
  { 
    name: '终末地干员', 
    status: '游戏中：明日方舟', 
    avatar: '/assets/images/games/arknights-endfield.svg',
    gameStyle: 'arknights'
  },
]);

// 消息数据
const messages = ref([
  { sender: '系统', text: '欢迎来到公共频道，请遵守聊天规则！', time: '今天 12:00', isMe: false, read: true, reactions: 0, likedByMe: false },
  { 
    sender: '星际旅行者', 
    text: '有人在玩新出的星际探索游戏吗？', 
    time: '今天 12:05', 
    isMe: false, 
    read: true,
    avatar: '',
    reactions: 2,
    likedByMe: true // Example: User liked this
  },
  { 
    sender: '量子猎手', 
    text: '我刚开始玩，还在适应操作', 
    time: '今天 12:07', 
    isMe: false, 
    read: true,
    avatar: '',
    reactions: 0,
    likedByMe: false
  },
  { sender: '我', text: '我已经玩了一周了，可以带你们熟悉一下游戏机制', time: '今天 12:10', isMe: true, read: true, reactions: 1, likedByMe: false },
  { 
    sender: '星际旅行者', 
    text: '太好了！什么时候有空？', 
    time: '今天 12:12', 
    isMe: false, 
    read: true,
    avatar: '',
    reactions: 0,
    likedByMe: false
  },
  { sender: '我', text: '今晚8点，我们可以在游戏里组队', time: '今天 12:15', isMe: true, read: true, reactions: 0, likedByMe: false },
  { 
    sender: '量子猎手', 
    text: '我也来！', 
    time: '今天 12:16', 
    isMe: false, 
    read: true,
    avatar: '',
    reactions: 0,
    likedByMe: false
  },
  { 
    sender: '深海猎人', 
    text: '我在鸣潮里发现了一个隐藏任务，需要四人小队才能完成，有人感兴趣吗？', 
    time: '今天 12:20', 
    isMe: false, 
    read: true,
    avatar: '/assets/images/games/wuthering-waves-icon.svg',
    gameStyle: 'wuthering',
    reactions: 5,
    likedByMe: false
  },
  { 
    sender: '源石术师', 
    text: '明日方舟新活动开始了，有人一起刷本吗？', 
    time: '今天 12:25', 
    isMe: false, 
    read: true,
    avatar: '/assets/images/games/arknights-icon.svg',
    gameStyle: 'arknights',
    reactions: 3,
    likedByMe: true // Example: User liked this
  },
  ]);


// 消息容器引用
const messageContainer = ref<HTMLElement | null>(null);

// 新消息输入
const newMessage = ref('');

// 正在输入的用户
const typingUser = ref<string | null>(null);
let typingTimeout: ReturnType<typeof setTimeout> | null = null;

// 发送消息方法
const sendMessage = () => {
  if (newMessage.value.trim() === '') return;
  
  // 添加新消息到列表
  messages.value.push({
    sender: '我',
    text: newMessage.value,
    time: '刚刚',
    isMe: true,
    read: false,
    reactions: 0,
    likedByMe: false,
    avatar: '' // 添加缺失的avatar属性
  });
  
  // 清空输入框
  newMessage.value = '';
  
  // 滚动到底部
  scrollToBottom();
  
  // 模拟收到回复和输入状态
  simulateResponse();
};

// 使用特定游戏风格发送消息
const sendWithStyle = (style: string) => {
  if (newMessage.value.trim() === '') return;
  
  // 根据风格添加不同的前缀
  let prefix = '';
  if (style === 'wuthering') {
    prefix = '[鸣潮] ';
  } else if (style === 'arknights') {
    prefix = '[明日方舟] ';
  }
  
  // 添加新消息到列表
  messages.value.push({
    sender: '我',
    text: prefix + newMessage.value,
    time: '刚刚',
    isMe: true,
    read: false,
    gameStyle: style,
    reactions: 0,
    likedByMe: false,
    avatar: '' // 添加缺失的avatar属性
  });
  
  // 清空输入框
  newMessage.value = '';
  
  // 滚动到底部
  scrollToBottom();
  
  // 模拟收到相同风格的回复和输入状态
  simulateResponse(style);
};

// 模拟回复和输入状态
const simulateResponse = (style?: string) => {
  // 清除之前的输入状态模拟
  if (typingTimeout) clearTimeout(typingTimeout);
  typingUser.value = null;

  // 模拟对方开始输入
  const potentialTypers = style === 'wuthering' 
    ? ['深海猎人', '深蓝档案员'] 
    : style === 'arknights' 
    ? ['源石术师', '终末地干员'] 
    : ['星际旅行者', '量子猎手', '深海猎人', '源石术师'];
  const currentTyper = potentialTypers[Math.floor(Math.random() * potentialTypers.length)];
  typingUser.value = currentTyper;

  // 模拟输入持续时间和发送回复
  typingTimeout = setTimeout(() => {
    typingUser.value = null; // 停止显示输入状态
    let response;
    if (style === 'wuthering') {
      response = {
        sender: '深海猎人',
        text: '你也是鸣潮玩家？我们可以一起组队探索深海区域！',
        time: '刚刚',
        isMe: false,
        read: true,
        avatar: '/assets/images/games/wuthering-waves-icon.svg',
        gameStyle: 'wuthering',
        reactions: 0,
        likedByMe: false
      };
    } else if (style === 'arknights') {
      response = {
        sender: '源石术师',
        text: '博士，您回来了！罗德岛需要您的指挥！',
        time: '刚刚',
        isMe: false,
        read: true,
        avatar: '/assets/images/games/arknights-icon.svg',
        gameStyle: 'arknights',
        reactions: 0,
        likedByMe: false
      };
    } else {
      const genericResponses = [
        { sender: '系统', text: '消息已收到。', time: '刚刚', isMe: false, read: true, reactions: 0, likedByMe: false },
        { sender: '星际旅行者', text: '收到，晚上见！', time: '刚刚', isMe: false, read: true, avatar: '', reactions: 0, likedByMe: false },
      ];
      response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }

    if (response) {
      messages.value.push(response);
      scrollToBottom();
    }
  }, Math.random() * 2000 + 1000); // 模拟1-3秒的输入时间
};



// 滚动到底部方法
const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    }
  });
};

// 点赞消息方法
const reactToMessage = (index: number) => {
  const message = messages.value[index];
  if (message.likedByMe) {
    message.reactions--;
    message.likedByMe = false;
  } else {
    message.reactions++;
    message.likedByMe = true;
  }
};

// 监听消息变化，自动滚动到底部
watch(() => messages.value.length, scrollToBottom);

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
/* 在线用户列表项 */
.bailu-user-item:hover {
  background-color: rgba(var(--color-secondary-dark-rgb), 0.7);
}
.hanlu-user-item:hover {
  background-color: rgba(var(--color-secondary-dark-rgb), 0.7);
}
.xiaohan-user-item:hover {
  background-color: rgba(var(--color-secondary-dark-rgb), 0.7);
}

/* 为特定游戏用户添加高亮 */
.wuthering-user-item {
  border-left: 3px solid rgba(74, 144, 226, 0.7); /* 鸣潮蓝 */
  padding-left: calc(0.5rem - 3px); /* Adjust padding to account for border */
}
.arknights-user-item {
  border-left: 3px solid rgba(255, 111, 97, 0.7); /* 明日方舟红 */
  padding-left: calc(0.5rem - 3px); /* Adjust padding to account for border */
}

/* 确保悬停效果与游戏高亮兼容 */
.wuthering-user-item:hover {
  background-color: rgba(74, 144, 226, 0.15);
}
.arknights-user-item:hover {
  background-color: rgba(255, 111, 97, 0.15);
}


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

/* 游戏主题消息样式 */
.wuthering-message {
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.5); /* 鸣潮蓝光晕 */
  border: 1px solid rgba(74, 144, 226, 0.6);
  /* 添加渐变背景或特定图案 */
  background-image: linear-gradient(to bottom right, rgba(74, 144, 226, 0.1), rgba(74, 144, 226, 0.05));
}

.arknights-message {
  box-shadow: 0 0 10px rgba(255, 111, 97, 0.5); /* 明日方舟红光晕 */
  border: 1px solid rgba(255, 111, 97, 0.6);
  /* 添加渐变背景或特定图案 */
  background-image: linear-gradient(to bottom right, rgba(255, 111, 97, 0.1), rgba(255, 111, 97, 0.05));
}

/* 节气消息装饰 */
.bailu-message-decoration {
  /* 可以添加白露相关的SVG图案或背景 */
  background: radial-gradient(circle at top left, rgba(220, 235, 255, 0.1), transparent 60%);
}
.hanlu-message-decoration {
  /* 可以添加寒露相关的SVG图案或背景 */
  background: radial-gradient(circle at top left, rgba(255, 224, 180, 0.1), transparent 60%);
}
.xiaohan-message-decoration {
  /* 可以添加小寒相关的SVG图案或背景 */
  background: radial-gradient(circle at top left, rgba(210, 230, 255, 0.1), transparent 60%);
}

/* 游戏特定装饰元素 */
.wuthering-message-decoration {
  /* 鸣潮风格装饰，例如声波纹理 */
  background: repeating-linear-gradient(
    45deg,
    rgba(74, 144, 226, 0.05),
    rgba(74, 144, 226, 0.05) 5px,
    rgba(74, 144, 226, 0) 5px,
    rgba(74, 144, 226, 0) 10px
  );
}
.arknights-message-decoration {
  /* 明日方舟风格装饰，例如源石碎片纹理 */
   background: repeating-linear-gradient(
    -45deg,
    rgba(255, 111, 97, 0.05),
    rgba(255, 111, 97, 0.05) 5px,
    rgba(255, 111, 97, 0) 5px,
    rgba(255, 111, 97, 0) 10px
  );
}

/* 游戏风格快速发送按钮 */
.wuthering-quick-button {
  background-color: #4a90e2; /* 鸣潮蓝 */
  border: 1px solid #ffffff50;
}
.wuthering-quick-button:hover {
  background-color: #357abd;
}

.arknights-quick-button {
  background-color: #ff6f61; /* 明日方舟红 */
  border: 1px solid #ffffff50;
}
.arknights-quick-button:hover {
  background-color: #e65a50;
}

/* 调整输入框 padding-right 以免被按钮遮挡 */
.seasonal-input {
  padding-right: 5rem; /* 根据按钮数量和大小调整 */
}

/* 游戏/玩家特定头像和徽章 */
.seasonal-avatar {
  /* Base styles, potentially overridden by theme */
  border: 2px solid transparent; 
}
.bailu-avatar {
  border-color: var(--color-bailu-accent-light);
}
.hanlu-avatar {
  border-color: var(--color-hanlu-accent-light);
}
.xiaohan-avatar {
  border-color: var(--color-xiaohan-accent-light);
}

.wuthering-avatar {
  background-color: rgba(74, 144, 226, 0.8); /* 鸣潮蓝背景 */
  border-color: rgba(74, 144, 226, 1); /* 鸣潮蓝边框 */
}

.arknights-avatar {
  background-color: rgba(255, 111, 97, 0.8); /* 明日方舟红背景 */
  border-color: rgba(255, 111, 97, 1); /* 明日方舟红边框 */
}

.player-badge {
  background-color: var(--color-neon-purple); /* 玩家徽章颜色 */
  border: 1px solid var(--color-primary-light);
}

.wuthering-badge {
  background-color: #4a90e2; /* 鸣潮蓝 */
  border: 1px solid var(--color-primary-light);
  color: white;
}

.arknights-badge {
  background-color: #ff6f61; /* 明日方舟红 */
  border: 1px solid var(--color-primary-light);
  color: white;
}

/* 游戏标签 */
.wuthering-tag {
  background-color: rgba(74, 144, 226, 0.2);
  color: rgba(74, 144, 226, 1);
  border: 1px solid rgba(74, 144, 226, 0.5);
}
.arknights-tag {
  background-color: rgba(255, 111, 97, 0.2);
  color: rgba(255, 111, 97, 1);
  border: 1px solid rgba(255, 111, 97, 0.5);
}

/* Reaction Button Styles */
.bailu-reaction-button {
  /* Add specific Bailu styles if needed */
}
.hanlu-reaction-button {
  /* Add specific Hanlu styles if needed */
}
.xiaohan-reaction-button {
  /* Add specific Xiaohan styles if needed */
}
.bailu-reaction-button-active {
  background-color: rgba(255, 105, 180, 0.1); /* Light pink background for liked */
}
.hanlu-reaction-button-active {
  background-color: rgba(255, 160, 122, 0.1); /* Light salmon background for liked */
}
.xiaohan-reaction-button-active {
  background-color: rgba(173, 216, 230, 0.1); /* Light blue background for liked */
}

/* Reaction Count Styles */
.bailu-reaction-count {
  color: var(--color-bailu-accent);
}
.hanlu-reaction-count {
  color: var(--color-hanlu-accent);
}
.xiaohan-reaction-count {
  color: var(--color-xiaohan-accent);
}

/* Typing Indicator Styles */
.bailu-typing-indicator {
  color: var(--color-bailu-text-secondary);
}
.hanlu-typing-indicator {
  color: var(--color-hanlu-text-secondary);
}
.xiaohan-typing-indicator {
  color: var(--color-xiaohan-text-secondary);
}

</style>