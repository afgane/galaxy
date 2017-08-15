define("mvc/workflow/workflow-globals",{}),define(["utils/utils","mvc/workflow/workflow-globals","mvc/workflow/workflow-manager","mvc/workflow/workflow-canvas","mvc/workflow/workflow-node","mvc/workflow/workflow-icons","mvc/workflow/workflow-forms","mvc/ui/ui-misc","utils/async-save-text","libs/toastr","ui/editable-text"],function(a,b,c,d,e,f,g,h,i){function j(a){var b=$("#galaxy_tools").contents();if(0===b.length&&(b=$(document),$(this).removeClass("search_active"),b.find(".toolTitle").removeClass("search_match"),b.find(".toolSectionBody").hide(),b.find(".toolTitle").show(),b.find(".toolPanelLabel").show(),b.find(".toolSectionWrapper").each(function(){"recently_used_wrapper"!==$(this).attr("id")?$(this).show():$(this).hasClass("user_pref_visible")&&$(this).show()}),b.find("#search-no-results").hide(),b.find("#search-spinner").hide(),a)){var c=b.find("#tool-search-query");c.val("search tools")}}return add_node_icon=function(a,b){var c=f[b];if(c){var d=$('<i class="icon fa">&nbsp;</i>').addClass(c);a.before(d)}},Backbone.View.extend({initialize:function(c){function e(){var a=$('<form><label style="display:inline-block; width: 100%;">Save as name: </label><input type="text" id="workflow_rename" style="width: 80%;" autofocus/><br><label style="display:inline-block; width: 100%;">Annotation: </label><input type="text" id="wf_annotation" style="width: 80%;" /></form>');window.show_modal("Save As a New Workflow",a,{OK:function(){var a=$("#workflow_rename").val().length>0?$("#workflow_rename").val():"SavedAs_"+k.workflow.name,b=$("#wf_annotation").val().length>0?$("#wf_annotation").val():"";$.ajax({url:k.urls.workflow_save_as,type:"POST",data:{workflow_name:a,workflow_annotation:b,workflow_data:function(){return JSON.stringify(k.workflow.to_simple())}}}).done(function(a){window.onbeforeunload=void 0,window.location=Galaxy.root+"workflow/editor?id="+a,hide_modal()}).fail(function(){hide_modal(),alert("Saving this workflow failed. Please contact this site's administrator.")})},Cancel:hide_modal})}function f(){k.workflow.layout(),k.workflow.fit_canvas_to_nodes(),k.scroll_to_nodes(),k.canvas_manager.draw_overview()}function g(){$.jStorage.set("overview-off",!1),$("#overview-border").css("right","0px"),$("#close-viewport").css("background-position","0px 0px")}function h(){$.jStorage.set("overview-off",!0),$("#overview-border").css("right","20000px"),$("#close-viewport").css("background-position","12px 0px")}var k=b.app=this;this.options=c,this.urls=c&&c.urls||{};var l=function(){k.workflow.check_changes_in_active_form(),workflow&&k.workflow.has_changes?(do_close=function(){window.onbeforeunload=void 0,window.document.location=k.urls.workflow_index},window.show_modal("Close workflow editor","There are unsaved changes to your workflow which will be lost.",{Cancel:hide_modal,"Save Changes":function(){m(null,do_close)}},{"Don't Save":do_close})):window.document.location=k.urls.workflow_index},m=function(b,c){return show_message("Saving workflow","progress"),k.workflow.check_changes_in_active_form(),k.workflow.has_changes?(k.workflow.rectify_workflow_outputs(),void a.request({url:Galaxy.root+"api/workflows/"+k.options.id,type:"PUT",data:{workflow:k.workflow.to_simple()},success:function(a){var b=$("<div/>").text(a.message);if(a.errors){b.addClass("warningmark");var d=$("<ul/>");$.each(a.errors,function(a,b){$("<li/>").text(b).appendTo(d)}),b.append(d)}else b.addClass("donemark");k.workflow.name=a.name,k.workflow.has_changes=!1,k.workflow.stored=!0,k.showWorkflowParameters(),a.errors?window.show_modal("Saving workflow",b,{Ok:hide_modal}):(c&&c(),hide_modal())},error:function(a){window.show_modal("Saving workflow failed.",a.err_msg,{Ok:hide_modal})}})):(hide_modal(),void(c&&c()))};$("#tool-search-query").click(function(){$(this).focus(),$(this).select()}).keyup(function(){if($(this).css("font-style","normal"),this.value.length<3)j(!1);else if(this.value!=this.lastValue){$(this).addClass("search_active");var a=this.value;this.timer&&clearTimeout(this.timer),$("#search-spinner").show(),this.timer=setTimeout(function(){$.get(k.urls.tool_search,{q:a},function(a){if($("#search-no-results").hide(),$(".toolSectionWrapper").hide(),$(".toolSectionWrapper").find(".toolTitle").hide(),0!=a.length){var b=$.map(a,function(a){return"link-"+a});$(b).each(function(a,b){$("[id='"+b+"']").parent().addClass("search_match"),$("[id='"+b+"']").parent().show().parent().parent().show().parent().show()}),$(".toolPanelLabel").each(function(){for(var a=$(this),b=a.next(),c=!0;0!==b.length&&b.hasClass("toolTitle");){if(b.is(":visible")){c=!1;break}b=b.next()}c&&a.hide()})}else $("#search-no-results").show();$("#search-spinner").hide()},"json")},400)}this.lastValue=this.value}),this.canvas_manager=b.canvas_manager=new d(this,$("#canvas-viewport"),$("#overview")),this.reset(),this.datatypes=JSON.parse($.ajax({url:Galaxy.root+"api/datatypes",async:!1}).responseText),this.datatypes_mapping=JSON.parse($.ajax({url:Galaxy.root+"api/datatypes/mapping",async:!1}).responseText),this.ext_to_type=this.datatypes_mapping.ext_to_class_name,this.type_to_type=this.datatypes_mapping.class_to_classes,this._workflowLoadAjax(k.options.id,{success:function(a){k.reset(),k.workflow.from_simple(a,!0),k.workflow.has_changes=!1,k.workflow.fit_canvas_to_nodes(),k.scroll_to_nodes(),k.canvas_manager.draw_overview(),upgrade_message="",_.each(a.steps,function(b,c){var d="";b.errors&&(d+="<li>"+b.errors+"</li>"),_.each(a.upgrade_messages[c],function(a){d+="<li>"+a+"</li>"}),d&&(upgrade_message+="<li>Step "+(parseInt(c,10)+1)+": "+k.workflow.nodes[c].name+"<ul>"+d+"</ul></li>")}),upgrade_message?window.show_modal("Issues loading this workflow","Please review the following issues, possibly resulting from tool upgrades or changes.<p><ul>"+upgrade_message+"</ul></p>",{Continue:hide_modal}):hide_modal(),k.showWorkflowParameters()},beforeSubmit:function(){show_message("Loading workflow","progress")}}),window.make_popupmenu&&make_popupmenu($("#workflow-options-button"),{Save:m,"Save As":e,Run:function(){window.location=Galaxy.root+"workflow/run?id="+k.options.id},"Edit Attributes":function(){k.workflow.clear_active_node()},"Auto Re-layout":f,Close:l}),overview_size=$.jStorage.get("overview-size"),void 0!==overview_size&&$("#overview-border").css({width:overview_size,height:overview_size}),$.jStorage.get("overview-off")?h():g(),$("#overview-border").bind("dragend",function(a,b){var c=$(this).offsetParent(),d=c.offset(),e=Math.max(c.width()-(b.offsetX-d.left),c.height()-(b.offsetY-d.top));$.jStorage.set("overview-size",e+"px")}),$("#close-viewport").click(function(){"0px"===$("#overview-border").css("right")?h():g()}),window.onbeforeunload=function(){return workflow&&k.workflow.has_changes?"There are unsaved changes to your workflow which will be lost.":void 0},this.options.workflows.length>0&&$("#left").find(".toolMenu").append(this._buildToolPanelWorkflows()),$("div.toolSectionBody").hide(),$("div.toolSectionTitle > span").wrap("<a href='#'></a>");var n=null;$("div.toolSectionTitle").each(function(){var a=$(this).next("div.toolSectionBody");$(this).click(function(){a.is(":hidden")?(n&&n.slideUp("fast"),n=a,a.slideDown("fast")):(a.slideUp("fast"),n=null)})}),i("workflow-name","workflow-name",k.urls.rename_async,"new_name"),$("#workflow-tag").click(function(){return $(".tag-area").click(),!1}),i("workflow-annotation","workflow-annotation",k.urls.annotate_async,"new_annotation",25,!0,4)},_buildToolPanelWorkflows:function(){var a=this,b=$('<div class="toolSectionWrapper"><div class="toolSectionTitle"><a href="#"><span>Workflows</span></a></div><div class="toolSectionBody"><div class="toolSectionBg"/></div></div>');return _.each(this.options.workflows,function(c){if(c.id!==a.options.id){var d=new h.ButtonIcon({icon:"fa fa-copy",cls:"ui-button-icon-plain",tooltip:"Copy and insert individual steps",onclick:function(){c.step_count<2?a.copy_into_workflow(c.id,c.name):Galaxy.modal.show({title:"Warning",body:"This will copy "+c.step_count+" new steps into your workflow.",buttons:{Cancel:function(){Galaxy.modal.hide()},Copy:function(){Galaxy.modal.hide(),a.copy_into_workflow(c.id,c.name)}}})}}),e=$("<a/>").attr("href","#").html(c.name).on("click",function(){a.add_node_for_subworkflow(c.latest_id,c.name)});b.find(".toolSectionBg").append($("<div/>").addClass("toolTitle").append(e).append(d.$el))}}),b},copy_into_workflow:function(a){var b=this;this._workflowLoadAjax(a,{success:function(a){b.workflow.from_simple(a,!1),upgrade_message="",$.each(a.upgrade_messages,function(a,c){upgrade_message+="<li>Step "+(parseInt(a,10)+1)+": "+b.workflow.nodes[a].name+"<ul>",$.each(c,function(a,b){upgrade_message+="<li>"+b+"</li>"}),upgrade_message+="</ul></li>"}),upgrade_message?window.show_modal("Subworkflow embedded with changes","Problems were encountered loading this workflow (possibly a result of tool upgrades). Please review the following parameters and then save.<ul>"+upgrade_message+"</ul>",{Continue:hide_modal}):hide_modal()},beforeSubmit:function(){show_message("Importing workflow","progress")}})},reset:function(){this.workflow&&this.workflow.remove_all(),this.workflow=b.workflow=new c(this,$("#canvas-container"))},scroll_to_nodes:function(){var a,b,c=$("#canvas-viewport"),d=$("#canvas-container");b=d.width()<c.width()?(c.width()-d.width())/2:0,a=d.height()<c.height()?(c.height()-d.height())/2:0,d.css({left:b,top:a})},_workflowLoadAjax:function(b,c){$.ajax(a.merge(c,{url:this.urls.load_workflow,data:{id:b,_:"true"},dataType:"json",cache:!1}))},_moduleInitAjax:function(b,c){var d=this;a.request({type:"POST",url:Galaxy.root+"api/workflows/build_module",data:c,success:function(a){b.init_field_data(a),b.update_field_data(a),d.workflow.activate_node(b)}})},add_node_for_tool:function(a,b){node=this.workflow.create_node("tool",b,a),this._moduleInitAjax(node,{type:"tool",tool_id:a,_:"true"})},add_node_for_subworkflow:function(a,b){node=this.workflow.create_node("subworkflow",b,a),this._moduleInitAjax(node,{type:"subworkflow",content_id:a,_:"true"})},add_node_for_module:function(a,b){node=this.workflow.create_node(a,b),this._moduleInitAjax(node,{type:a,_:"true"})},display_pja:function(a,b){var c=this;$("#pja_container").append(get_pja_form(a,b)),$("#pja_container>.toolForm:last>.toolFormTitle>.buttons").click(function(){action_to_rem=$(this).closest(".toolForm",".action_tag").children(".action_tag:first").text(),$(this).closest(".toolForm").remove(),delete c.workflow.active_node.post_job_actions[action_to_rem],c.workflow.active_form_has_changes=!0})},display_pja_list:function(){return pja_list},display_file_list:function(a){addlist="<select id='node_data_list' name='node_data_list'>";for(var b in a.output_terminals)addlist+="<option value='"+b+"'>"+b+"</option>";return addlist+="</select>",addlist},new_pja:function(a,b,c){if(void 0===c.post_job_actions&&(c.post_job_actions={}),void 0===c.post_job_actions[a+b]){var d={};return d.action_type=a,d.output_name=b,c.post_job_actions[a+b]=null,c.post_job_actions[a+b]=d,display_pja(d,c),this.workflow.active_form_has_changes=!0,!0}return!1},showWorkflowParameters:function(){var b=/\$\{.+?\}/g,c=[],d=$("#workflow-parameters-container"),e=$("#workflow-parameters-box"),f="",g=[];$.each(this.workflow.nodes,function(d,e){e.config_form&&e.config_form.inputs&&a.deepeach(e.config_form.inputs,function(a){if("string"==typeof a.value){var c=a.value.match(b);c&&(g=g.concat(c))}}),e.post_job_actions&&$.each(e.post_job_actions,function(a,c){c.action_arguments&&$.each(c.action_arguments,function(a,c){var d=c.match(b);d&&(g=g.concat(d))})}),g&&$.each(g,function(a,b){-1===$.inArray(b,c)&&c.push(b)})}),c&&0!==c.length?($.each(c,function(a,b){f+="<div>"+b.substring(2,b.length-1)+"</div>"}),d.html(f),e.show()):(d.html(f),e.hide())},showAttributes:function(){$(".right-content").hide(),$("#edit-attributes").show()},showForm:function(b,c,d){var e=this,h="right-content",i=h+"-"+c.id,j=$("#"+h);if(d&&(j.find("#"+i).remove(),$('<div id="'+i+'" class="'+h+'"/>').remove()),b&&0==j.find("#"+i).length){var k=$('<div id="'+i+'" class="'+h+'"/>'),l=null;b.node=c,b.workflow=this.workflow,b.datatypes=this.datatypes,b.icon=f[c.type],b.cls="ui-portlet-narrow",b.inputs.unshift({type:"text",name:"__annotation",label:"Annotation",fixed:!0,value:c.annotation,area:!0,help:"Add an annotation or notes to this step. Annotations are available when a workflow is viewed."}),b.inputs.unshift({type:"text",name:"__label",label:"Label",value:c.label,help:"Add a step label.",fixed:!0,onchange:function(a){var b=!1;for(var d in e.workflow.nodes){var f=e.workflow.nodes[d];if(f.label&&f.label==a&&f.id!=c.id){b=!0;break}}var g=l.form.data.match("__label"),h=l.form.element_list[g];h.model.set("error_text",b&&"Duplicate label. Please fix this before saving the workflow."),l.form.trigger("change")}}),b.onchange=function(){a.request({type:"POST",url:Galaxy.root+"api/workflows/build_module",data:{id:c.id,type:c.type,content_id:c.content_id,inputs:l.form.data.create()},success:function(a){c.update_field_data(a)}})},l="tool"==c.type?new g.Tool(b):new g.Default(b),k.append(l.form.$el),j.append(k)}$("."+h).hide(),j.find("#"+i).show(),j.show(),j.scrollTop()},isSubType:function(a,b){return a=this.ext_to_type[a],b=this.ext_to_type[b],this.type_to_type[a]&&b in this.type_to_type[a]},prebuildNode:function(a,b,c){var d=this,f=$("<div class='toolForm toolFormInCanvas'/>"),g=$("<div class='toolFormTitle unselectable'><span class='nodeTitle'>"+b+"</div></div>");add_node_icon(g.find(".nodeTitle"),a),f.append(g),f.css("left",$(window).scrollLeft()+20),f.css("top",$(window).scrollTop()+20),f.append($("<div class='toolFormBody'></div>"));var h=new e(this,{element:f});h.type=a,h.content_id=c;var i="<div><img height='16' align='middle' src='"+Galaxy.root+"static/images/loading_small_white_bg.gif'/> loading tool info...</div>";f.find(".toolFormBody").append(i);var j=$("<div class='buttons' style='float: right;'></div>");j.append($("<div/>").addClass("fa-icon-button fa fa-times").click(function(){h.destroy()})),f.appendTo("#canvas-container");var k=$("#canvas-container").position(),l=$("#canvas-container").parent(),m=f.width(),n=f.height();return f.css({left:-k.left+l.width()/2-m/2,top:-k.top+l.height()/2-n/2}),j.prependTo(f.find(".toolFormTitle")),m+=j.width()+10,f.css("width",m),f.bind("dragstart",function(){d.workflow.activate_node(h)}).bind("dragend",function(){d.workflow.node_changed(this),d.workflow.fit_canvas_to_nodes(),d.canvas_manager.draw_overview()}).bind("dragclickonly",function(){d.workflow.activate_node(h)}).bind("drag",function(a,b){var c=$(this).offsetParent().offset(),d=b.offsetX-c.left,e=b.offsetY-c.top;$(this).css({left:d,top:e}),$(this).find(".terminal").each(function(){this.terminal.redraw()})}),h}})});
//# sourceMappingURL=../../../maps/mvc/workflow/workflow-view.js.map