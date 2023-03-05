<template lang="">
  <div>
    <CourseSearchBar/>
    <CourseTable />
  </div>
</template>
<script>
  import CourseTable from '@/components/CourseTable';
  import CourseVedio from '@/components/CourseVedio';
  // import SearchBar from '@/components/SearchBar';
  import CourseSearchBar from '@/components/CourseSearchBar';
  export default {
    name: 'MyIndex',
    components: {
      CourseTable,
      CourseSearchBar
    }
  }
</script>
<style lang="">

</style>