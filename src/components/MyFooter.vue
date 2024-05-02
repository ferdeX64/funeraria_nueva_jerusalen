<template>
  <footer class="footer bg-base-1000 p-10 text-base-content">
    <div>
      <el-image style="width: 90px; height: 90px;" :src="logo" />
      <p>
        Funeraria y Lápidas Renacer
        <br />2024
      </p>
    </div>
    <div>
      <span class="footer-title">Servicios</span>
      <a class="link-hover link">Branding</a>
      <a class="link-hover link">Design</a>
      <a class="link-hover link">Marketing</a>
      <a class="link-hover link">Advertisement</a>
    </div>
    <div>
      <span class="footer-title">Compañia</span>
      <a class="link-hover link">About us</a>
      <a class="link-hover link">Contact</a>
      <a class="link-hover link">Jobs</a>
      <a class="link-hover link">Press kit</a>
    </div>
    <div>
      <span class="footer-title">Legal</span>
      <a class="link-hover link">Terms of use</a>
      <a class="link-hover link">Privacy policy</a>
      <a class="link-hover link">Cookie policy</a>
    </div>
  </footer>
  <slot></slot>
</template>
<script setup>
import logo from '../assets/logo2.png'
</script>