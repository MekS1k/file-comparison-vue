<template>
  <div>
    <div class="res-blck">
      <span v-if="table1non == '' && table2non == ''" class="NoDifference">
        В файлах все данные совпадают
      </span>
      <span
        v-else
        v-for="(item, index6) in table2non"
        :key="item.id"
        class="result"
      >
        <span> файл "{{ fileName1 }}", содержащий </span>
        <span v-for="(item2, index2) in item" :key="item2.id">
          <span>
            {{ index2 }}: <b>{{ item2 }} </b>
          </span>
        </span>
        <span> не совпадает с </span> файлом {{ fileName2 }}

        <span
          v-for="(item3, index1) in table1non"
          :key="item3.id"
          class="result"
        >
          <div v-if="index6 == index1">
            <span> содержащий </span>
            <span v-for="(item4, index3) in item3" :key="item4.id">
              <span>
                {{ index3 }}: <b>{{ item4 }}</b>
              </span>
            </span>
          </div>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  components: {},
  data() {
    return {
      similar: [],
      table1non: [],
      table2non: [],
      AllNon: [],
      fileName1: this.$store.state.NameFile1,
      fileName2: this.$store.state.NameFile2,
    };
  },
  mounted() {
    this.GetNonSimilar();
  },

  methods: {
    GetNonSimilar() {
      //данных которых нет во второй таблице
      this.$store.state.firstFileData.forEach((dataFirstTable, index) => {
        this.$store.state.SecondFileData.forEach((dataSecondTable) => {
          if (lodash.isEqual(dataFirstTable, dataSecondTable)) {
            this.similar.push(this.$store.state.firstFileData[index]);
            this.table2non = this.$store.state.firstFileData.filter(
              (value) => !this.similar.includes(value)
            );
          }
        });
      });
      //данные которых нет в первой таблице
      this.$store.state.SecondFileData.forEach((dataSecondTable, index) => {
        this.$store.state.firstFileData.forEach((dataFirstTable) => {
          if (lodash.isEqual(dataSecondTable, dataFirstTable)) {
            this.similar.push(this.$store.state.SecondFileData[index]);
            this.table1non = this.$store.state.SecondFileData.filter(
              (value) => !this.similar.includes(value)
            );
          }
        });
      });
      console.log(this.AllNon);
    },
  },
};
</script>

<style>
.res-blck {
  margin: 0 auto;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  border-radius: 15px;
  width: 1000px;
}
.NoDifference {
  text-align: center;
}
.result {
  display: block;
  background-color: #8bd47e;
  border-radius: 15px;
  border: 2px solid;
  margin: 15px;
  padding: 20px;
}
</style>
