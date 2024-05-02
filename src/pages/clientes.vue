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
        <el-table-column type="index" width="50" />
        <el-table-column prop="nombre_cliente">
          <template #header>
            <el-text tag="b">Nombre</el-text>
          </template>
        </el-table-column>
        <el-table-column prop="celular_cliente">
          <template #header>
            <el-text tag="b">Número de celular</el-text>
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
            <el-button size="small" @click="handleVer(scope.$index, scope.row)"
              >Ver observaciones</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="handleVerAdd(scope.$index, scope.row)"
              >Agregar observación</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    title="Lista de observaciones"
    width="600"
  >
    <el-table
      :default-sort="{ prop: 'fecha_observacion', order: 'descending' }"
      height="250"
      :data="clientedata.observacion"
      style="width: 100%"
      empty-text="No hay datos"
    >
      <el-table-column prop="detalle_observacion" label="Observación" />
      <el-table-column sortable prop="fecha_observacion" label="Fecha" />
      <el-table-column label="Opciones" width="100">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Eliminar</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Aceptar</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog v-model="addObservacion" title="Agregar observación" width="600">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="auto"
      style="max-width: 600px"
      label-position="top"
      :rules="rules"
    >
      <el-form-item label="Observación:" prop="observacion">
        <el-input v-model="ruleForm.observacion" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addObservacion = false">Cancelar</el-button>
        <el-button type="primary" @click="handleAdd(ruleFormRef)">Guardar</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, nextTick } from "vue";
import {
  collection,
  onSnapshot,
  doc,

  query,

  updateDoc,
  arrayUnion,

  arrayRemove,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { onMounted } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { orderBy } from "cypress/types/lodash";
const dialogVisible = ref(false);
const addObservacion = ref(false);
const clientedata = ref();

const search = ref("");
const filterTableData = computed(() =>
  firedata.value.filter(
    (data: Cliente) =>
      !search.value ||
      data.nombre_cliente.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleVer = async (index: number, row: Cliente) => {
  dialogVisible.value = true;
  clientedata.value = row;
};
const handleVerAdd = async (index: number, row: Cliente) => {
  addObservacion.value = true;
  clientedata.value = row;
};
const handleAdd = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const fecha = new Date().toLocaleString("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h24",
      });
      const fechamodi = fecha.charAt(0).toUpperCase() + fecha.slice(1);
      const docRef = doc(db, "Clientes", clientedata.value.id_cliente);
      let docData;
      if (clientedata.value.observaciones == "") {
        docData = {
          observacion: [
            {
              detalle_observacion: ruleForm.observacion,
              fecha_observacion: fechamodi,
            },
          ],
        };
      } else {
        docData = {
          observacion: arrayUnion({
            detalle_observacion: ruleForm.observacion,
            fecha_observacion: fechamodi,
          }),
        };
      }

      // Atomically add a new region to the "regions" array field.
      updateDoc(docRef, docData);
      addObservacion.value = false;
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: "<strong>Observación agregada</strong>",
        type: "success",
      });
      formEl.resetFields();
    } else {
      console.log("error submit!", fields);
    }
  });
};
const handleDelete = async (index: number, row: Observacion) => {
  console.log(index, row);
  const docRef = doc(db, "Clientes", clientedata.value.id_cliente);
  const docData = {
    observacion: arrayRemove({
      detalle_observacion: row.detalle_observacion,
      fecha_observacion: row.fecha_observacion,
    }),
  };
  // Atomically add a new region to the "regions" array field.
  updateDoc(docRef, docData);
  dialogVisible.value = false;
  ElMessage({
    dangerouslyUseHTMLString: true,
    message: "<strong>Observación eliminada</strong>",
    type: "success",
  });
};
interface RuleForm {
  observacion: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  observacion: "",
});

const rules = reactive<FormRules<RuleForm>>({
  observacion: [
    { required: true, message: "Ingrese la observación", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
});

interface Cliente {
  nombre_cliente: string;
  celular_cliente: string;
  id_cliente: string;
  observacion: object;
}
interface Observacion {
  detalle_observacion: string;
  fecha_observacion: string;
}
const firedata = ref<Cliente[]>([]);
async function getDocu() {
  const q = query(collection(db, "Clientes"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const clientes: Array<Cliente> = [];
    querySnapshot.forEach((doc) => {
      clientes.push({
        id_cliente: doc.data().id_cliente,
        nombre_cliente: doc.data().nombre_cliente,
        celular_cliente: doc.data().celular_cliente,
        observacion: doc.data().observacion,
      });
    });
    console.log();
    firedata.value = clientes;
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
</style>
