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
        <el-table-column prop="fecha_deuda">
          <template #header>
            <el-text tag="b">Fecha de ingreso</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="detalle_deuda">
          <template #header>
            <el-text tag="b">Detalle</el-text>
          </template>
        </el-table-column>

        <el-table-column prop="valor_deuda" align="center">
          <template #header>
            <el-text tag="b">Deuda $</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="deuda_final" align="center">
          <template #header>
            <el-text tag="b">Deuda total $</el-text>
          </template>
          <template #default="scope">
            <el-tag
              effect="dark"
              :type="scope.row.deuda_final <= 0 ? 'success' : 'warning'"
              disable-transitions
              >{{ scope.row.deuda_final <= 0 ? "Pagado" : scope.row.deuda_final }}</el-tag
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
          <template #default="scope">
            <el-button
              size="small"
              @click="handleVer(scope.$index, scope.row)"
              type="warning"
              >Ver Deuda</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="Deuda" width="800">
    <el-table :data="deudadata.transacciones" style="width: 100%">
      <el-table-column
        label="Deuda total: "
        row-style="font-weight: bold;background: #000;--el-table-tr-bg-color: var(--el-color-success-light-9);"
        width="200"
      >
        <template #header>
          <el-text tag="b">Estado de deuda:</el-text>
        </template>

        <el-table-column prop="fecha_transaccion" label="Fecha" width="200" />
      </el-table-column>
      <el-table-column>
        <template #header>
          <el-tag
            :type="deudadata.deuda_final <= 0 ? 'success' : 'warning'"
            size="large"
            >{{ deudadata.deuda_final <= 0 ? "Pagada" : "Por pagar" }}</el-tag
          >
        </template>

        <el-table-column prop="anticipo" label="Anticipo $" />

        <el-table-column prop="deuda_total" label="Deuda $" />
      </el-table-column>
    </el-table>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Aceptar</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import {
  collection,
  onSnapshot,
 
  query,

} from "firebase/firestore";
import { onMounted, ref } from "vue";
import { db } from "../utils/firebase";

const dialogVisible = ref(false);
const addObservacion = ref(false);
const deudadata = ref();
interface Deuda {
  detalle_deuda: string;
  deuda_final: string;
  fecha_deuda: string;
  transacciones: object;
  fecha: string;
  id_deuda: string;
  valor_deuda: string;
}

const firedata = ref<Deuda[]>([]);

const search = ref("");
const filterTableData = computed(() =>
  firedata.value.filter(
    (data) =>
      !search.value ||
      data.detalle_deuda.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleVer = (index: number, row: Deuda) => {
  dialogVisible.value = true;
  deudadata.value = row;
  console.log(index, row);
};


async function getDocu() {
  let count = 0;
  const q = query(collection(db, "Deudas"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const deudas: Array<Deuda> = [];
    querySnapshot.forEach((doc) => {
      deudas.push({
        detalle_deuda: doc.data().detalle_deuda,
        deuda_final: doc.data().deuda_final,
        fecha_deuda: doc.data().fecha_deuda,
        transacciones: doc.data().transacciones,
        fecha: doc.data().fecha,
        id_deuda: doc.data().id_deuda,
        valor_deuda: doc.data().valor_deuda,
      });
    });

    firedata.value = deudas;
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
  getDocu(); // <div>
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
