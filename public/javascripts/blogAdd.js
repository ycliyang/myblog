/**
 * Created by Administrator on 2014/6/16.
 */
function blogAddSubmit(){
    var str = $("#editor").html();
    if(str.length<=10){
        bootbox.alert("文章内容必须大于十个字！");
        return false;
    }else {
        document.addBlog.content.value=str;
        return true;
    }
}
