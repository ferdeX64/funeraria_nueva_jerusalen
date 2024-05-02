<template scoped>
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <el-table
        :data="filterTableData"
        style="width: 100%"
        empty-text="No hay datos"
        height="500"
      >
        <el-table-column prop="nombre_producto">
          <template #header>
            <el-text tag="b">Nombre del producto</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="fecha_inventario">
          <template #header>
            <el-text tag="b">Fecha de ingreso</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="cantidad" align="center">
          <template #header>
            <el-text tag="b">Cantidad</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="url_foto" align="center">
          <template #header>
            <el-text tag="b">Foto</el-text>
          </template>
          <template #default="scope">
            <div class="demo-image__preview">
              <el-image
                preview-teleported="true"
                style="width: 100px; height: 100px"
                :src="scope.row.url_foto[0]"
                :zoom-rate="1.2"
                :max-scale="10"
                :min-scale="0.2"
                :preview-src-list="scope.row.url_foto"
                :initial-index="4"
                fit="cover"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" width="400px">
          <template #header>
            <div class="bar">
              <el-text tag="b">Búsqueda:</el-text>
              <el-input
                v-model="search"
                size="small"
                placeholder="Escribe el nombre para buscar"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc,
  arrayUnion,
  Timestamp,
  addDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
const dialogVisible = ref(false);
const addObservacion = ref(false);
const ordendata = ref();

const search = ref("");
const filterTableData = computed(() =>
  firedata.value.filter(
    (data) =>
      !search.value ||
      data.nombre_producto.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleVer = (index: number, row: Inventario) => {
  dialogVisible.value = true;
  ordendata.value = row;
  console.log(index, row);
};
const handleadd = (index: number, row: Inventario) => {
  addObservacion.value = true;
  ordendata.value = row;
  console.log(index, row);
};
const handleDelete = (index: number, row: Inventario) => {
  console.log(index, row);
};
interface Inventario {
  nombre_producto: string;
  cantidad: number;
  fecha: string;
  fecha_inventario: string;
  id_producto: string;
  url_foto: object;
}

const firedata = ref<Inventario[]>([]);
async function getDocu() {
  const q = query(collection(db, "Inventario"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let inventario: Array<Inventario> = [];
    querySnapshot.forEach((doc) => {
      inventario.push({
        id_producto: doc.data().id_producto,
        nombre_producto: doc.data().nombre_producto,
        cantidad: doc.data().cantidad,
        fecha_inventario: doc.data().fecha_inventario,
        fecha: doc.data().fecha,
        url_foto: doc.data().url_foto,
      });
    });

    firedata.value = inventario;
    firedata.value.sort(function (a, b) {
      // Convert the date strings to Date objects
      let dateA = new Date(a.fecha).getTime();
      let dateB = new Date(b.fecha).getTime();

      // Subtract the dates to get a value that is either negative, positive, or zero
      return dateB - dateA;
    });
  });
}

onMounted(() => {
  getDocu();
  // <div>
});
</script>
<style>
.bar {
  display: grid;
  grid-template-columns: 180px 200px;
}

.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
