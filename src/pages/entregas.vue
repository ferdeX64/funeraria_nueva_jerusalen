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
      <el-table-column prop="numero_orden" width="150" align="center">
            <template #header>
              <el-text tag="b">N° de orden</el-text>
            </template>
          </el-table-column>
        <el-table-column prop="nombre_cliente">
          <template #header>
            <el-text tag="b">Nombre del cliente</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="fecha_entrega_escrita" align="center">
          <template #header>
            <el-text tag="b">Fecha de entrega</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="status"  width="150" align="center">
          <template #header>
            <el-text tag="b">Estado</el-text>
          </template>
          <template #default="scope">
            <el-tag
              effect="dark"
              :type="
                scope.row.status <= 5 && scope.row.status >= 0
                  ? 'danger'
                  : scope.row.status >= 5 && scope.row.status <= 8
                  ? 'warning'
                  : scope.row.status >= 8
                  ? 'primary'
                  : scope.row.status < 0
                  ? 'info'
                  : 'info'
              "
              disable-transitions
              >{{
                scope.row.status <= 5 && scope.row.status >= 0
                  ? "Atrasado"
                  : scope.row.status >= 5 && scope.row.status <= 8
                  ? "Falta poco"
                  : scope.row.status >= 8
                  ? "A tiempo"
                  : scope.row.status < 0
                  ? "Vencido"
                  : "Vencido"
              }}</el-tag
            >
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
  <el-dialog v-model="dialogVisible" title="Lista de observaciones" width="600">
    <el-descriptions class="margin-top" :column="3" border direction="vertical">
      <el-descriptions-item width="300">
        <template #label>
          <div class="cell-item">Observaciones</div>
        </template>
        No contesta las llamadas
      </el-descriptions-item>
      <el-descriptions-item width="200">
        <template #label>
          <div class="cell-item">Fecha</div>
        </template>
        12 de marzo del 2024
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" :column="3" border direction="vertical">
    </el-descriptions>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Aceptar</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="addObservacion" title="Agregar observación" width="600">
    <el-form
      :model="form"
      label-width="auto"
      style="max-width: 600px"
      label-position="top"
    >
      <el-form-item label="Observación:">
        <el-input v-model="form.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Guardar</el-button>
      </div>
    </template>
  </el-dialog>
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
interface User {
  status: string;
  name: string;
  date: string;
}

const search = ref("");
const filterTableData = computed(() =>
  firedata.value.filter(
    (data) =>
      !search.value ||
      data.nombre_cliente.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleVer = (index: number, row: User) => {
  dialogVisible.value = true;
  ordendata.value = row;
  console.log(index, row);
};
const handleadd = (index: number, row: User) => {
  addObservacion.value = true;
  ordendata.value = row;
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
interface Orden {
  nombre_cliente: string;
  id_orden: string;
  status: string;
  fecha_entrega: string;
  fecha_entrega_escrita: string;
  numero_orden:string;
}
const firedata = ref<Orden[]>([]);
async function getDocu() {
  const q = query(collection(db, "Ordenes de trabajo"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let entregas: Array<Orden> = [];
    querySnapshot.forEach((doc) => {
      entregas.push({
        id_orden: doc.data().id_orden,
        nombre_cliente: doc.data().nombre_cliente,
        fecha_entrega: doc.data().fecha_entrega,
        status: dias(doc.data().fecha_entrega).toString(),
        fecha_entrega_escrita: doc.data().fecha_entrega_escrita,
        numero_orden:doc.data().numero_orden
      });
    });

    firedata.value = entregas;
    firedata.value.sort(function (a, b) {
      // Convert the date strings to Date objects
      let dateA = new Date(a.fecha_entrega).getTime();
      let dateB = new Date(b.fecha_entrega).getTime();

      // Subtract the dates to get a value that is either negative, positive, or zero
      return dateB - dateA;
    });
  });
}
function dias(fecha_fin: string) {
  var fechaInicio = new Date().getTime();
  var fechaFin = new Date(fecha_fin).getTime();

  var diff = (fechaFin - fechaInicio) / (1000 * 60 * 60 * 24);

  return diff + 0.24;
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
</style>
