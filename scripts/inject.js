hexo.extend.filter.register('theme_inject', function(injects) {
    injects.footer.file('default', 'source/_inject/footer.ejs', { key: 'value' }, -1);
    //injects.footer.raw('default', '<script async src="https://xxxxxx" crossorigin="anonymous"></script>');
  });