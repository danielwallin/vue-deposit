<template>
    <div>
        <div :class="[containerClasses, isFocused ? 'active' : '', error ? 'has-errors' : '']" v-if="label && label.length">
            <div :class="[labelContainerClasses]">
                <span>{{ label }}</span>
                <span :if="error">{{ error }}</span>
            </div>
            <input @focus="isFocused = true" @blur="isFocused = false" :class="classes" :type="type" v-model="inputVal" />
        </div>
        <div v-else>
            <input :type="type" :class="classes" v-model="inputVal" />
            <p class="error" :if="error">{{ error }}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    value: Number,
    onChange: Function,
    classes: String,
    containerClasses: String,
    labelContainerClasses: String,
    type: String,
    label: String,
    error: String
  },
  data() {
    return {
        inputVal: this.value,
        isFocused: false
    };
  },
  watch: {
    inputVal(val) {
      this.$emit("onChange", val);
    }
  }
};
</script>
