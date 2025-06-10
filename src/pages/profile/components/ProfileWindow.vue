<script setup>

try {
    const user = await axiosDB.get(API_URL + '/user/');
    console.log(user.data);
} catch (err) {
  console.error('Ошибка:', err);
}

defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: 'Иван Иванов',
      email: 'ivan@example.com',
      phone: '+7 (123) 456-78-90',
      studentId: '12345678',
      avatar: 'https://i.pinimg.com/736x/a9/57/98/a957983394246f57439920cb836e2d45.jpg',
      faculty: 'Информационные технологии',
      course: '3 курс',
      group: 'ИТ-301'
    })
  }
})

</script>
<template>
    <div class="profile-card">
        <div class="profile-header">
            <img :src="user.avatar" alt="Аватар" class="profile-avatar">
            <h2 class="profile-name">{{ user.name }}</h2>
            <p class="profile-email">{{ user.email }}</p>
            </div>

            <div class="profile-details">
            <div class="detail-item">
                <i class="bi bi-telephone"></i>
                <span>{{ user.phone }}</span>
            </div>
            <div class="detail-item">
                <i class="bi bi-person-badge"></i>
                <span>Студенческий билет: {{ user.studentId }}</span>
            </div>
            <div class="detail-item">
                <i class="bi bi-building"></i>
                <span>Факультет: {{ user.faculty }}</span>
            </div>
            <div class="detail-item">
                <i class="bi bi-book"></i>
                <span>{{ user.course }}, {{ user.group }}</span>
            </div>
            </div>

            <button class="btn btn-edit">
            <i class="bi bi-pencil"></i> Редактировать профиль
        </button>
  </div>
</template>

<style scoped>
.profile-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #f0f2f5;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.profile-email {
  color: #666;
  margin-bottom: 0;
}

.profile-details {
  margin: 1.5rem 0;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item i {
  margin-right: 10px;
  color: #6c757d;
  width: 24px;
  text-align: center;
}

.btn-edit {
  width: 100%;
  background-color: #4e73df;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.btn-edit:hover {
  background-color: #3a5bc7;
}
</style>