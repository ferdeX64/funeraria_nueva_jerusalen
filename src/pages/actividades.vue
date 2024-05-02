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
                <el-table :data="props.row.actividad">
                  <el-table-column align="center">
                    <template #header>
                      <el-text tag="b" style="margin-left: 10px"
                        >Actividades de la secretaria</el-text
                      >
                    </template>

                    <el-table-column label="Descripción" prop="descripcion" />
                    <el-table-column label="Hora" prop="hora" />
                  </el-table-column>
                </el-table>
                <div class="grid-content ep-bg-purple"
              /></el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="fecha_actividad">
          <template #header>
            <el-text tag="b">Fecha</el-text>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {  ref,  onMounted } from "vue";
import {
  collection,
  onSnapshot,
  
  query,
 
} from "firebase/firestore";
import { db } from "../utils/firebase";
const array = [
  {
    date: "11/3/2024, 20:09:15",
  },
  {
    date: "12/3/2024, 20:09:15",
  },
  {
    date: "10/1/2024, 20:09:15",
  },
  {
    date: "11/4/2024, 20:09:15",
  },
];
interface Actividad {
  id_actividad: string;
  fecha: string;
  fecha_actividad: string;
  actividad: object;
}
const firedata = ref<Actividad[]>([]);
async function getDocu() {
  const consultaActividad = query(collection(db, "Actividades secretaria"));

  const unsubscribe = onSnapshot(consultaActividad, async (querySnapshot) => {
    const actividades: Array<Actividad> = [];
    querySnapshot.forEach((doc) => {
      actividades.push({
        id_actividad: doc.data().id_actividad,
        fecha: doc.data().fecha,
        fecha_actividad: doc.data().fecha_actividad,
        actividad: doc.data().actividad,
      });
    });
    firedata.value = actividades;
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
