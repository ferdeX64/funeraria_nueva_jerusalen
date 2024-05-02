<template>
  <header class="navbar bg-base-100">
    <div class="flex-none">
      <a class="btn btn-ghost text-xl normal-case"
        ><router-link to="/">Funeraria y Lápidas Renacer</router-link></a
      >
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal p-0">
        <li>
          <router-link to="/ordenes">Ordenes de trabajo</router-link>
        </li>
        <li>
          <router-link to="/actividades">Actividades de la secretaria</router-link>
        </li>
        <li>
          <router-link to="/dinero">Fondos</router-link>
        </li>
        <li>
          <router-link to="/clientes">Clientes</router-link>
        </li>
        <li>
          <router-link to="/entregas">Entregas</router-link>
        </li>
        <li>
          <router-link to="/inventario">Inventario</router-link>
        </li>
        <li>
          <router-link to="/deudas">Deudas</router-link>
        </li>
      </ul>
    </div>
    <div class="flex-1">
      <slot></slot>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";

const counter = useCounterStore();
</script>
