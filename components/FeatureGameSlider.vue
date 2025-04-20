<template>
  <div class="feature-slider">
    <div class="slider-container" @mouseenter="pauseAutoScroll" @mouseleave="resumeAutoScroll">
      <div class="slider-nav-btn prev" @click="prevSlide">
        <span class="btn-glow"><Icon name="mingcute:left-fill" size="24" /></span>
      </div>
      
      <div class="slider-wrapper" ref="sliderWrapper">
        <div 
          v-for="(game, index) in games" 
          :key="game.id"
          class="slide-item"
          :class="{ 'active': currentIndex === index, 'prev': getPrevIndex(index), 'next': getNextIndex(index) }"
          @click="setCurrentSlide(index)"
        >
          <div class="slide-content glass-effect card-hover-effect">
            <div class="slide-image-wrapper">
              <img :src="game.image" :alt="game.title" class="slide-image">
              <div class="slide-overlay">
                <span class="game-genre">{{ game.genre }}</span>
                <div class="game-rating">
                  <span class="rating-stars">
                    <Icon name="ph:star-fill" v-for="n in Math.floor(game.rating)" :key="n" />
                    <Icon name="ph:star-half-fill" v-if="game.rating % 1 >= 0.5" />
                  </span>
                  <span class="rating-value">{{ game.rating.toFixed(1) }}</span>
                </div>
              </div>
            </div>
            
            <div class="slide-info">
              <h3 class="game-title neon-text">{{ game.title }}</h3>
              <p class="game-description">{{ game.description }}</p>
              <div class="slide-actions">
                <nuxt-link :to="`/games/${game.id}`" class="btn-primary btn-glow">
                  立即购买
                  <span class="price">¥{{ game.price.toFixed(2) }}</span>
                </nuxt-link>
                <button class="btn-secondary">
                  <Icon name="ph:heart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="slider-nav-btn next" @click="nextSlide">
        <span class="btn-glow"><Icon name="mingcute:right-fill" size="24" /></span>
      </div>
    </div>
    
    <div class="slider-indicators">
      <button 
        v-for="(_, index) in games" 
        :key="index" 
        class="indicator"
        :class="{ 'active': currentIndex === index }"
        @click="setCurrentSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  games: {
    type: Array,
    default: () => []
  }
});

const currentIndex = ref(0);
const sliderWrapper = ref(null);
let autoScrollInterval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.games.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.games.length) % props.games.length;
};

const setCurrentSlide = (index) => {
  currentIndex.value = index;
};

const getPrevIndex = (index) => {
  return ((currentIndex.value - 1 + props.games.length) % props.games.length) === index;
};

const getNextIndex = (index) => {
  return ((currentIndex.value + 1) % props.games.length) === index;
};

const startAutoScroll = () => {
  autoScrollInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const pauseAutoScroll = () => {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
};

const resumeAutoScroll = () => {
  pauseAutoScroll();
  startAutoScroll();
};

onMounted(() => {
  startAutoScroll();
});

onBeforeUnmount(() => {
  pauseAutoScroll();
});
</script>

<style scoped>
.feature-slider {
  position: relative;
  width: 100%;
  margin: 3rem 0;
}

.slider-container {
  position: relative;
  display: flex;
  align-items: center;
  height: 380px;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.slider-wrapper {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.slide-item {
  position: absolute;
  width: 80%;
  height: 100%;
  left: 10%;
  opacity: 0;
  transform: scale(0.8) translateX(100%);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  z-index: 0;
}

.slide-item.active {
  opacity: 1;
  transform: scale(1) translateX(0);
  z-index: 3;
  pointer-events: auto;
}

.slide-item.prev {
  opacity: 0.6;
  transform: scale(0.85) translateX(-75%);
  z-index: 2;
  pointer-events: auto;
}

.slide-item.next {
  opacity: 0.6;
  transform: scale(0.85) translateX(75%);
  z-index: 2;
  pointer-events: auto;
}

.slide-content {
  display: flex;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
}

.slide-image-wrapper {
  position: relative;
  width: 55%;
  height: 100%;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.slide-item:hover .slide-image {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.game-genre {
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.game-rating {
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 0.5rem;
  border-radius: 20px;
  color: gold;
}

.rating-stars {
  display: flex;
  margin-right: 5px;
}

.rating-value {
  color: white;
  font-weight: 600;
}

.slide-info {
  width: 45%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.game-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.game-description {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slide-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(45deg, #0062ff, #00a1ff);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
}

.price {
  margin-left: 0.5rem;
  opacity: 0.9;
}

.btn-secondary {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.slider-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
}

.slider-nav-btn.prev {
  left: 20px;
}

.slider-nav-btn.next {
  right: 20px;
}

.slider-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 0.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: white;
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .slide-content {
    flex-direction: column;
  }
  
  .slide-image-wrapper,
  .slide-info {
    width: 100%;
  }
  
  .slide-image-wrapper {
    height: 200px;
  }
  
  .slide-item.active {
    width: 90%;
    left: 5%;
  }
}
</style> 