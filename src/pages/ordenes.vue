<template scoped>
  <div class="bg-gray-50">
    <el-row :gutter="0">
      <el-col
        :xs="50"
        :sm="100"
        :md="102"
        :lg="19"
        :xl="91"
        class="bg mb-[65px] mt-[65px] ml-[65px]"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
      >
        <el-table
          :data="filterTableData"
          style="width: 100%"
          empty-text="No hay datos"
          :default-sort="{ prop: 'fecha_orden', order: 'descending' }"
          height="500"
        >
          <el-table-column prop="numero_orden" width="110" align="center">
            <template #header>
              <el-text tag="b">N° de orden</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="nombre_cliente" align="center">
            <template #header>
              <el-text tag="b">Cliente</el-text>
            </template>
          </el-table-column>
          <el-table-column prop="fecha_orden" sortable align="center">
            <template #header>
              <el-text tag="b">Fecha</el-text>
            </template>
          </el-table-column>
          <el-table-column align="center" width="500px">
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
              <el-button size="small" @click="handleVerOrden(scope.$index, scope.row)"
                >Ver</el-button
              >
              <el-popconfirm
                width="200"
                confirm-button-text="Si"
                cancel-button-text="No"
                icon-color="#626AEF"
                title="Estas seguro que quieres eliminar esta orden?"
                @confirm="handleDeleteOrden(scope.$index, scope.row)"
                ><template #reference>
                  <el-button type="danger" size="small">Eliminar</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        :xs="1"
        :sm="1"
        :md="1"
        :lg="1"
        :xl="1"
        class="mb-[2px] mt-[65px] ml-[65px]"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 200,
          },
        }"
      >
        <el-button type="success" @click="handleVerForm(ruleFormRef)" size="large"
          >Agregar orden</el-button
        >
      </el-col>
    </el-row>
  </div>

  <el-dialog v-model="dialogVisible" title="Orden de trabajo" width="650" top="20px">
    <div class="impresion">
      <el-descriptions class="margin-top" :column="3" border direction="horizontal">
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Tipo:</div>
          </template>
          {{ ordendata.tipo }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border direction="horizontal">
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">N° de orden:</div>
          </template>
          {{ ordendata.numero_orden }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border direction="horizontal">
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Nombre del cliente:</div>
          </template>
          {{ ordendata.nombre_cliente }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fecha:</div>
          </template>
          {{ ordendata.fecha_orden }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Celular:</div>
          </template>
          {{ ordendata.celular_cliente }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Dirección:</div>
          </template>
          {{ ordendata.direccion_cliente }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fallecido:</div>
          </template>
          {{ ordendata.nombre_fallecido }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fecha de nacimiento:</div>
          </template>
          {{ ordendata.fecha_nacimiento }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fecha de defunción:</div>
          </template>
          {{ ordendata.fecha_defuncion }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fondo:</div>
          </template>
          {{ ordendata.fondo }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Aplique:</div>
          </template>
          {{ ordendata.aplique }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Oración:</div>
          </template>
          {{ ordendata.oracion }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Recuerdo:</div>
          </template>
          {{ ordendata.recuerdo }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Marco:</div>
          </template>
          {{ ordendata.marco }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Foto de cerámica:</div>
          </template>
          {{ ordendata.foto_ceramica }}
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Medida:</div>
          </template>
          {{ ordendata.medida }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Fecha de entrega:</div>
          </template>
          {{ ordendata.fecha_entrega }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Valor:</div>
          </template>
          {{ ordendata.valor }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Anticipo:</div>
          </template>
          {{ ordendata.anticipo }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Saldo:</div>
          </template>
          {{ ordendata.saldo }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions class="margin-top" :column="3" border direction="horizontal">
        <el-descriptions-item width="200">
          <template #label>
            <div class="cell-item">Observación:</div>
          </template>
          {{ ordendata.observacion }}
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="warning" @click="generateReport()">Imprimir</el-button>
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="dialogVisible = false">Aceptar</el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-if="verForm"
    v-model="verForm"
    title="Agregar orden de trabajo"
    width="650"
    top="20px"
  >
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="Tipo:" prop="tipo">
        <el-input v-model="ruleForm.tipo" />
      </el-form-item>
      <el-form-item label="Nombre del cliente:" prop="nombre_cliente">
        <el-input v-model="ruleForm.nombre_cliente" />
      </el-form-item>
      <el-form-item label="Celular:" prop="celular_cliente">
        <el-input maxlength="9" v-model.number="ruleForm.celular_cliente" />
      </el-form-item>
      <el-form-item label="Dirección:" prop="direccion_cliente">
        <el-input v-model="ruleForm.direccion_cliente" type="textarea" />
      </el-form-item>
      <el-form-item label="Nombre del fallecido:" prop="nombre_fallecido">
        <el-input v-model="ruleForm.nombre_fallecido" />
      </el-form-item>
      <el-form-item label="Fecha de nacimiento:" required>
        <el-col :span="11">
          <el-form-item prop="fecha_nacimiento">
            <el-date-picker
              v-model="ruleForm.fecha_nacimiento"
              type="date"
              label="Escoja una fecha"
              placeholder="Escoja una fecha"
              style="width: 100%"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Fecha de defunción:" required>
        <el-col :span="11">
          <el-form-item prop="fecha_defuncion">
            <el-date-picker
              v-model="ruleForm.fecha_defuncion"
              type="date"
              label="Escoja una fecha"
              placeholder="Escoja una fecha"
              style="width: 100%"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Fondo:" prop="fondo">
        <el-input v-model="ruleForm.fondo" />
      </el-form-item>
      <el-form-item label="Aplique:" prop="aplique">
        <el-input v-model="ruleForm.aplique" />
      </el-form-item>
      <el-form-item label="Oración:" prop="oracion">
        <el-input v-model="ruleForm.oracion" type="textarea" />
      </el-form-item>
      <el-form-item label="Recuerdo:" prop="recuerdo">
        <el-input v-model="ruleForm.recuerdo" type="textarea" />
      </el-form-item>
      <el-form-item label="Marco:" prop="marco">
        <el-switch
          v-model="ruleForm.marco"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
          active-value="Si"
          inactive-value="No"
        />
      </el-form-item>
      <el-form-item label="Foto de la cerámica:" prop="foto_ceramica">
        <el-switch
          v-model="ruleForm.foto_ceramica"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
          active-value="Si"
          inactive-value="No"
        />
      </el-form-item>
      <el-form-item label="Medida:" prop="medida">
        <el-input v-model="ruleForm.medida" />
      </el-form-item>
      <el-form-item label="Fecha de entrega:" required>
        <el-col :span="11">
          <el-form-item prop="fecha_entrega">
            <el-date-picker
              v-model="ruleForm.fecha_entrega"
              type="date"
              label="Escoja una fecha"
              placeholder="Escoja una fecha"
              style="width: 100%"
              format="YYYY/MM/DD"
              value-format="YYYY/MM/DD"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Valor $:" prop="valor">
        <el-input-number
          v-model="ruleForm.valor"
          :precision="2"
          :step="0.05"
          :max="3000"
        />
      </el-form-item>
      <el-form-item label="Anticipo $:" prop="anticipo">
        <el-input-number
          v-model="ruleForm.anticipo"
          :precision="2"
          :step="0.05"
          :max="3000"
        />
      </el-form-item>
      <el-form-item label="Saldo $:" prop="saldo">
        <el-input-number
          v-model="ruleForm.saldo"
          :precision="2"
          :step="0.05"
          :max="3000"
        />
      </el-form-item>

      <el-form-item label="Observación:" prop="observacion">
        <el-input v-model="ruleForm.observacion" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="resetForm(ruleFormRef)">Reiniciar</el-button>
        <el-button type="success" @click="submitForm(ruleFormRef)">Guardar</el-button>
      </div>
    </template>
  </el-dialog>
  <vue3-html2pdf
    v-if="dialogVisible"
    :show-layout="false"
    :float-layout="true"
    :enable-download="false"
    :preview-modal="visorpdf"
    :paginate-elements-by-height="1400"
    filename="Atención"
    :pdf-quality="2"
    :manual-pagination="false"
    pdf-format="a4"
    pdf-orientation="landscape"
    pdf-content-width="800px"
    ref="html2Pdf"
    :html-to-pdf-options="{
      margin: 0,

      filename: 'Orden de trabajo',
      html2canvas: {
        scale: 3,
        y: -1,
      },
      jsPDF: {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16, //
      },
    }"
  >
    <template v-slot:pdf-content>
    
      <div class="borde_principal">
        <el-image style="width: 90px; height: 90px; position:absolute; bottom:990px; right:665px;" :src="logo" />
        <div class="encabezado">
          <div class="box">
            <h1>&nbsp&nbsp&nbsp&nbsp Funeraria y Lápidas</h1>
            <h1>&nbsp&nbsp&nbsp&nbsp Renacer</h1>
            <h3>Fabricamos Lápidas funerarias, cofres mortuorios al por mayor y menor</h3>
            <h3>Matriz: Km 4 1/2 Principal s/n Salcedo</h3>
            <h3>Dirección: Benjamin Delgado s/n y Av 29 de Mayo - Macas</h3>
            <h3>Telf: 099 826 4874 / 096 929 4023</h3>
          </div>
          <div class="box">
            <div class="orden">
              <h2>ORDEN DE</h2>
              <h2>TRABAJO N°</h2>
            </div>
            <div class="finalorden">
              <h2 style="color: red">{{ ordendata.numero_orden }}</h2>
            </div>
          </div>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Fecha: &nbsp &nbsp</p>

          <p>{{ ordendata.fecha_orden }}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Cliente:&nbsp &nbsp</p>

          <p>{{ ordendata.nombre_cliente }}</p>
        </div>
        <div class="datos_cierre">
          <p style="font-weight: 800">Dirección:&nbsp &nbsp</p>

          <p>{{ ordendata.direccion_cliente }}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Tipo:&nbsp &nbsp</p>

          <p>{{ ordendata.tipo }}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Nombre del fallecido:&nbsp &nbsp</p>

          <p>{{ ordendata.nombre_fallecido }}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Fecha:&nbsp &nbsp</p>

          <p>{{vida}} ✟ {{ dead }}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Fondo:&nbsp &nbsp</p>

          <p>{{ordendata.fondo}}</p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Aplique:&nbsp &nbsp</p>

          <p>
           {{ ordendata.aplique }}
          </p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Oración:&nbsp &nbsp</p>

          <p>
            {{ ordendata.oracion }}
          </p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Recuerdo:&nbsp &nbsp</p>

          <p>
            {{ ordendata.recuerdo }}
          </p>
        </div>
        <div class="datos">
          <p style="font-weight: 800">Marco:&nbsp &nbsp</p>

          <p>{{ ordendata.marco }}</p>
          <p style="font-weight: 800">&nbsp &nbsp&nbsp &nbspFoto de cerámica:&nbsp &nbsp</p>

          <p>{{ ordendata.foto_ceramica }}</p>
          <p style="font-weight: 800">&nbsp &nbsp&nbsp &nbspMedida:&nbsp &nbsp</p>

<p>{{ ordendata.medida }}</p>
        </div>
        
        <div class="datos">
          <p style="font-weight: 800">Fecha de entrega:&nbsp &nbsp</p>

          <p>{{ ordendata.fecha_entrega_escrita }}</p>
        </div>
        <div class="datos_cierre_final">
          <p style="font-weight: 800">Observación:&nbsp &nbsp</p>

          <p>
            {{ ordendata.observacion }}
          </p>
        </div>
        <div class="pie">
          <div class="piebox">
            <div class="firma">
              <p>___________________________</p>
              <p style="font-weight: 800">Firma de encargado</p>
            </div>
            <div class="firma">
              <p>___________________________</p>
              <p style="font-weight: 800">Firma de cliente</p>
            </div>
          </div>
          <div class="piebox">
            <div class="saldo">
              <p style="font-weight: 800">Valor:&nbsp &nbsp</p>

              <p>{{ ordendata.valor}}$</p>
            </div>
            <div class="saldo">
              <p style="font-weight: 800">Anticipo:&nbsp &nbsp</p>

              <p>{{ ordendata.anticipo }}$</p>
            </div>
            <div class="saldofinal">
              <p style="font-weight: 800">Saldo:&nbsp &nbsp</p>

              <p>{{ ordendata.saldo }}$</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </vue3-html2pdf>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted, nextTick } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { Check, Close } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import logo from '../assets/logo2.png'
import Vue3Html2pdf from "vue3-html2pdf";
const html2Pdf = ref();
const visorpdf = ref(true);
const vida = ref();
const dead = ref();
async function generateReport() {
  console.log("asdasdas");
  visorpdf.value = true;
  await nextTick();
  html2Pdf.value.generatePdf();
  console.log(ordendata.value.fecha_nacimiento);
  vida.value = fechaEscritaVida(ordendata.value.fecha_nacimiento);
  dead.value = fechaEscritaVida(ordendata.value.fecha_defuncion);
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

function fechaEscritaVida(vida) {
  const fechavida = new Date(vida).toLocaleString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return fechavida;
}

const dialogVisible = ref(false);
const verForm = ref(false);
const ordendata = ref();
const search = ref("");
const filterTableData = computed(() =>
  firedata.value.filter(
    (data) =>
      !search.value ||
      data.nombre_cliente.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleVerOrden = (index: number, row: Orden) => {
  dialogVisible.value = true;
  ordendata.value = row;
  console.log(index, row);
};
const handleDeleteOrden = (index: number, row: Orden) => {
  deleteDoc(doc(db, "Ordenes de trabajo", row.id_orden));
};
const handleVerForm = (formEl: FormInstance | undefined) => {
  verForm.value = true;
  formEl.resetFields()
};
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  tipo: string;
  nombre_cliente: string;
  fecha_orden: string;
  celular_cliente: string;
  direccion_cliente: string;
  nombre_fallecido: string;
  fecha_nacimiento: string;
  fecha_defuncion: string;
  fondo: string;
  aplique: string;
  oracion: string;
  recuerdo: string;
  marco: string;
  foto_ceramica: string;
  medida: string;
  fecha_entrega: string;
  valor: number;
  anticipo: number;
  saldo: number;
  observacion: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  tipo: "",
  nombre_cliente: "",
  fecha_orden: "",
  celular_cliente: "",
  direccion_cliente: "",
  nombre_fallecido: "",
  fecha_nacimiento: "",
  fecha_defuncion: "",
  fondo: "",
  aplique: "",
  oracion: "",
  recuerdo: "",
  marco: "",
  foto_ceramica: "",
  medida: "",
  fecha_entrega: "",
  valor: 0,
  anticipo: 0,
  saldo: 0,
  observacion: "",
});

const rules = reactive<FormRules<RuleForm>>({
  tipo: [
    { required: true, message: "Ingrese el tipo", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  nombre_cliente: [
    { required: true, message: "Ingrese el nombre del cliente", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  celular_cliente: [
    { required: true, message: "El celular es obligatorio", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback();
        } else if (value.toString().length < 9) {
          callback(new Error("Ingrese 9 dígitos"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
    { type: "number", message: "Debe ingresar un numero", trigger: "change" },
  ],
  direccion_cliente: [
    { required: true, message: "Ingrese la dirección del cliente", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  nombre_fallecido: [
    { required: true, message: "Ingrese el nombre del fallecido", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  fecha_nacimiento: [
    {
      type: "date",
      required: true,
      message: "Escoja la fecha de nacimiento",
      trigger: "change",
    },
  ],
  fecha_defuncion: [
    {
      type: "date",
      required: true,
      message: "Escoja la fecha de defunción",
      trigger: "change",
    },
  ],
  fondo: [
    { required: true, message: "Ingrese el fondo", trigger: "blur" },
    { min: 3, message: "Ingrese más de 3 caracteres", trigger: "change" },
  ],
  aplique: [
    { required: true, message: "Ingrese el aplique", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  oracion: [
    { required: true, message: "Ingrese la oración", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  recuerdo: [
    { required: true, message: "Ingrese el recuerdo", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  medida: [
    { required: true, message: "Ingrese la medida", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
  fecha_entrega: [
    {
      type: "date",
      required: true,
      message: "Escoja la fecha de entrega",
      trigger: "change",
    },
  ],
  valor: [
    { required: true, message: "El valor es requerido", trigger: "blur" },
    { type: "number", message: "El valor debe ser un numero", trigger: "change" },
  ],
  anticipo: [
    { required: true, message: "El anticipo es requerido", trigger: "blur" },
    { type: "number", message: "El anticipo debe ser un numero", trigger: "change" },
  ],
  saldo: [
    { required: true, message: "El saldo es requerido", trigger: "blur" },
    { type: "number", message: "El saldo debe ser un numero", trigger: "change" },
  ],

  observacion: [
    { message: "Ingrese la observación", trigger: "blur" },
    { min: 5, message: "Ingrese más de 5 caracteres", trigger: "change" },
  ],
});
const fechamodi = ref();
const solofecha = ref();
const solohora = ref();
const fechaDocsVarios = ref();
const fechaDocUno = ref();
const fechaentregaEscrita = ref();

function nowDate() {
  const fecha = new Date().toLocaleString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  solofecha.value = fecha.charAt(0).toUpperCase() + fecha.slice(1);
  const fechayhora = new Date().toLocaleString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h24",
  });

  fechamodi.value = fechayhora.charAt(0).toUpperCase() + fechayhora.slice(1);
  const hora = new Date().toLocaleString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h24",
  });
  solohora.value = hora;
  var d = new Date();
  const fechayhoraNumero =
    d.getFullYear() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getDate() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();
  fechaDocUno.value = fechayhoraNumero;

  var fechanumero = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
  fechaDocsVarios.value = fechanumero;
  const fechaentregaEs = new Date(ruleForm.fecha_entrega).toLocaleString("es-ES", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  console.log(fechaentregaEs);
  fechaentregaEscrita.value =
    fechaentregaEs.charAt(0).toUpperCase() + fechaentregaEs.slice(1);
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let randomNumber = Math.floor(Math.random() * 900) + 100;
      nowDate();
      verForm.value = false;

      const docData = {
        tipo: ruleForm.tipo,
        nombre_cliente: ruleForm.nombre_cliente,
        numero_orden: randomNumber,
        fecha_orden: fechamodi.value,
        fecha: fechaDocUno.value,
        celular_cliente: "0" + ruleForm.celular_cliente,
        direccion_cliente: ruleForm.direccion_cliente,
        nombre_fallecido: ruleForm.nombre_fallecido,
        fecha_nacimiento: ruleForm.fecha_nacimiento,
        fecha_defuncion: ruleForm.fecha_defuncion,
        fondo: ruleForm.fondo,
        aplique: ruleForm.aplique,
        oracion: ruleForm.oracion,
        recuerdo: ruleForm.recuerdo,
        marco: ruleForm.marco,
        foto_ceramica: ruleForm.foto_ceramica,
        medida: ruleForm.medida,
        fecha_entrega_escrita: fechaentregaEscrita.value,
        fecha_entrega: ruleForm.fecha_entrega,
        valor: ruleForm.valor,
        anticipo: ruleForm.anticipo,
        saldo: ruleForm.saldo,
        observacion: ruleForm.observacion,
      };
      const docRef = await addDoc(collection(db, "Ordenes de trabajo"), docData);

      await updateDoc(doc(db, "Ordenes de trabajo", docRef.id), {
        id_orden: docRef.id,
      });
      formEl.resetFields()
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: "<strong>Orden de trabajo agregada</strong>",
        type: "success",
      });
      const consultaActividad = query(
        collection(db, "Actividades secretaria"),
        where("fecha_actividad", "==", solofecha.value)
      );

      onSnapshot(consultaActividad, async (querySnapshot) => {
        const actividades: Array<Actividad> = [];
        querySnapshot.forEach((doc) => {
          actividades.push({
            id_actividad: doc.data().id_actividad,
            fecha: doc.data().fecha,
            fecha_actividad: doc.data().fecha_actividad,
            actividades: doc.data().actividades,
          });
        });
        if (actividades.length == 0) {
          const dataActividad = {
            fecha_actividad: solofecha.value,
            fecha: fechaDocsVarios.value,
            actividad: {
              descripcion: "Se redacto la orden de trabajo de " + ruleForm.nombre_cliente,
              hora: solohora.value,
            },
          };
          const docRefactividad = await addDoc(
            collection(db, "Actividades secretaria"),
            dataActividad
          );
          await updateDoc(doc(db, "Actividades secretaria", docRefactividad.id), {
            id_actividad: docRefactividad.id,
          });
        } else {
          const dataActividadSinFecha = {
            actividad: arrayUnion({
              descripcion: "Se redacto la orden de trabajo de " + ruleForm.nombre_cliente,
              hora: solohora.value,
            }),
          };
          await updateDoc(
            doc(db, "Actividades secretaria", actividades[0].id_actividad),
            dataActividadSinFecha
          );
        }
      });
      const consultaFondos = query(
        collection(db, "Fondos"),
        where("fecha_fondo", "==", solofecha.value)
      );
      const fondos: Array<Fondos> = [];
      const querySnapshotFondos = await getDocs(consultaFondos);
      querySnapshotFondos.forEach((doc) => {
        fondos.push({
          id_fondo: doc.data().id_fondo,
          fecha: doc.data().fecha,
          fecha_fondo: doc.data().fecha_fondo,
          dinero_caja: doc.data().dinero_caja,
          total_caja: doc.data().total_caja,
          transacciones: doc.data().transacciones,
        });
      });

      if (fondos.length == 0) {
        const dataFondo = {
          fecha_fondo: solofecha.value,
          fecha: fechaDocsVarios.value,
          dinero_caja: 0,
          total_caja: ruleForm.anticipo,
          transacciones: [
            {
              detalle_transaccion:
                "Cobro de anticipo de " +
                ruleForm.anticipo +
                "$ de la orden de trabajo de " +
                ruleForm.nombre_cliente,
              ingreso: ruleForm.anticipo,
              hora: solohora.value,
              saldo_total: ruleForm.anticipo,
            },
          ],
        };
        const docRefondos = await addDoc(collection(db, "Fondos"), dataFondo);
        await updateDoc(doc(db, "Fondos", docRefondos.id), {
          id_fondo: docRefondos.id,
        });
      } else {
        console.log(
          "este es el ultimo" +
            fondos[0].transacciones[fondos[0].transacciones.length - 1].ingreso
        );
        const dataFondosSinFecha = {
          total_caja: parseFloat(
            (
              fondos[0].transacciones[fondos[0].transacciones.length - 1].saldo_total +
              ruleForm.anticipo
            ).toFixed(2)
          ),
          transacciones: arrayUnion({
            detalle_transaccion:
              "Cobro de anticipo de " +
              ruleForm.anticipo +
              "$ de la orden de trabajo de " +
              ruleForm.nombre_cliente,
            ingreso: ruleForm.anticipo,
            hora: solohora.value,
            saldo_total: parseFloat(
              (
                fondos[0].transacciones[fondos[0].transacciones.length - 1].saldo_total +
                ruleForm.anticipo
              ).toFixed(2)
            ),
          }),
        };
        await updateDoc(doc(db, "Fondos", fondos[0].id_fondo), dataFondosSinFecha);
      }
    } else {
      
    }
  });
};

interface Orden {
  nombre_cliente: string;
  celular_cliente: string;
  id_orden: string;
  tipo: string;
  fecha: string;
  fecha_orden: string;
  fecha_entrega_escrita:string;
  direccion_cliente: string;
  nombre_fallecido: string;
  fecha_nacimiento: string;
  fecha_defuncion: string;
  fondo: string;
  aplique: string;
  oracion: string;
  recuerdo: string;
  marco: string;
  foto_ceramica: string;
  medida: string;
  fecha_entrega: string;
  valor: number;
  anticipo: number;
  saldo: number;
  observacion: string;
  numero_orden: number;
}
interface Actividad {
  id_actividad: string;
  fecha: string;
  fecha_actividad: string;
  actividades: object;
}
interface Fondos {
  id_fondo: string;
  fecha_fondo: string;
  fecha: string;
  dinero_caja: number;
  total_caja: number;
  transacciones: [
    {
      detalle_transaccion: string;
      ingreso: string;
      hora: string;
      saldo_total: number;
    }
  ];
}
const firedata = ref<Orden[]>([]);
async function getDocu() {
  const q = query(collection(db, "Ordenes de trabajo"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let clientes: Array<Orden> = [];
    querySnapshot.forEach((doc) => {
      clientes.push({
        id_orden: doc.data().id_orden,
        nombre_cliente: doc.data().nombre_cliente,
        celular_cliente: doc.data().celular_cliente,
        numero_orden: doc.data().numero_orden,
        tipo: doc.data().tipo,
        fecha: doc.data().fecha,
        fecha_orden: doc.data().fecha_orden,
        direccion_cliente: doc.data().direccion_cliente,
        nombre_fallecido: doc.data().nombre_cliente,
fecha_entrega_escrita:doc.data().fecha_entrega_escrita,
        fecha_nacimiento: doc.data().fecha_nacimiento,
        fecha_defuncion: doc.data().fecha_defuncion,
        fondo: doc.data().fondo,
        aplique: doc.data().aplique,
        oracion: doc.data().oracion,
        recuerdo: doc.data().recuerdo,
        marco: doc.data().marco,
        foto_ceramica: doc.data().foto_ceramica,
        medida: doc.data().medida,
        fecha_entrega: doc.data().fecha_entrega,
        valor: doc.data().valor,
        anticipo: doc.data().anticipo,
        saldo: doc.data().saldo,
        observacion: doc.data().observacion,
      });
    });

    firedata.value = clientes;
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
.firma {
  width: 225px;
  height: 125px;
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
}
.saldofinal{
  width: 225px;
  height: 52px;
  display: flex;
  padding-left: 10px;

}
.saldo {
  width: 225px;
  height: 52px;
  display: flex;
  padding-left: 10px;

  border-bottom: 2px solid rgb(7, 11, 248);
}
.pie {
  display: flex;
}
.piebox {
  width: 70%;
  height: 158px;
  display: flex;

  align-items: flex-end;
  justify-content: center;
  align-content: center;
  justify-items: end;
}
.piebox:last-child {
  display: grid;

  justify-items: center;
  width: 30%;
  border-left: 2px solid rgb(7, 11, 248);
  /* Elimina el margen derecho del último div */
}
.dialog {
  display: flex;

  justify-content: first baseline;
  margin: 10px;
}
.bar {
  display: grid;
  grid-template-columns: 180px 200px;
}
.add {
  height: 0;
  position: relative;
  left: 91%;
  top: 65px;
}
.bg {
  background: #000;
}
.impresion {
  width: 618px;
}
.borde_principal {
  margin: 20px auto;
  width: 750px;
  height: 1080px;
  border: 2px solid rgb(7, 11, 248);
  border-radius: 10px;
  background-color: transparent;
}
.encabezado {
  display: flex;
}
.box {
  width: 70%;
  height: 250px;
  display: grid;

  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  border-bottom: 2px solid rgb(7, 11, 248);
}
.box:last-child {
  display: grid;

  justify-items: center;
  width: 30%;
  border-left: 2px solid rgb(7, 11, 248);
  /* Elimina el margen derecho del último div */
}
.orden {
  width: 225px;
  height: 126px;
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;

  border-bottom: 2px solid rgb(7, 11, 248);
}
.finalorden {
  width: 225px;
  height: 126px;
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;

  
}


h1 {
  position: relative;
  bottom: 25px;
  font-size: 37px;
  font-weight: 800;
}
h2 {
  position: relative;
  bottom: 12px;
  font-size: 29px;
  font-weight: 800;
}
h3 {
  font-size: 14px;
  font-weight: 800;
}
p {
  position: relative;
  top: 5px;
}
.datos {
  display: flex;
  width: 100%;
  height: 50px;
  padding-left: 10px;
}
.datos_cierre {
  padding-left: 10px;
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid rgb(7, 11, 248);
}
.datos_cierre_final {
  padding-left: 10px;
  display: flex;
  width: 100%;
  height: 70px;
  border-bottom: 2px solid rgb(7, 11, 248);
}
</style>
