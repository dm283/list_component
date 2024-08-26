import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
// import BookView from "@/views/ItemView.vue";
import AddItemView from "@/views/AddItemView.vue";
// import EditBookView from "@/views/EditItemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
      path: '/items/add',
      name: 'add-item',
      component: AddItemView,
    },
    // {
    //   path: '/books/edit/:id',
    //   name: 'edit-book',
    //   component: EditBookView,
    // },
    // {
    //   path: '/books/:id',
    //   name: 'book',
    //   component: BookView,
    // },
  ]
});

export default router;
