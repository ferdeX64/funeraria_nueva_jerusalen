<template scoped>
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
    >
      <el-table :data="firedata" style="width: 100%" height="500">
        <el-table-column type="expand">
          <template #default="props">
            <el-row :gutter="0">
              <el-col :span="20" :offset="2">
                <el-table :data="props.row.transacciones" height="300">
                  <el-table-column align="center">
                    <template #header>
                      <el-text tag="b" style="margin-left: 10px">Transacciones</el-text>
                    </template>
                    <el-table-column prop="detalle_transaccion" label="Detalle" />
                    <el-table-column prop="gasto" label="Gasto $" />
                    <el-table-column prop="ingreso" label="Ingreso $" />
                    <el-table-column label="Hora" prop="hora" />
                    <el-table-column prop="saldo_total" label="Saldo total $" />
                  </el-table-column>
                </el-table>
                <div class="grid-content ep-bg-purple"
              /></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="fecha_fondo">
          <template #header>
            <el-text tag="b">Fecha</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="dinero_caja">
          <template #header>
            <el-text tag="b">Dinero en caja $</el-text>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <el-text tag="b">Total en caja $</el-text>
          </template>

          <template #default="scope">
            <el-tag
              effect="dark"
              type=" primary
              "
              disable-transitions
              >{{ scope.row.total_caja }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template #header>
            <el-text tag="b">Recibo</el-text>
          </template>

          <template #default="scope">
            <div class="demo-image__preview">
              <el-image
                preview-teleported="true"
                style="width: 100px; height: 100px"
                :src="scope.row.url_recibo[0]"
                :zoom-rate="1.2"
                :max-scale="10"
                :min-scale="0.2"
                :preview-src-list="scope.row.url_recibo"
                :initial-index="4"
                fit="cover"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import {
  collection,
  onSnapshot,
 
  query,

} from "firebase/firestore";
import { db } from "../utils/firebase";

interface Fondo {
  id_fondo: string;
  fecha: string;
  fecha_fondo: string;
  dinero_caja: string;
  total_caja: string;
  transacciones: object;
  url_recibo: object;
}
const firedata = ref<Fondo[]>([]);
async function getDocu() {
  const consultaActividad = query(collection(db, "Fondos"));

  const unsubscribe = onSnapshot(consultaActividad, async (querySnapshot) => {
    const fondos: Array<Fondo> = [];
    querySnapshot.forEach((doc) => {
      fondos.push({
        id_fondo: doc.data().id_fondo,
        fecha: doc.data().fecha,
        fecha_fondo: doc.data().fecha_fondo,
        dinero_caja: doc.data().dinero_caja,
        total_caja: doc.data().total_caja,
        transacciones: doc.data().transacciones,
        url_recibo: doc.data().url_recibo,
      });
    });
    firedata.value = fondos;
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
