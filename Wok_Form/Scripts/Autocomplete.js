"use strict";

window.app = {};

window.app.addedStudents = [];

window.app.addStudent = function (student,addOption) {
    var span = $('<span class="label label-default">' + student.Name + '&nbsp;(' + student.Group + ')' + '<span class="remove glyphicon glyphicon-remove-sign glyphicon-white"></span></span>');
    span.click(function () {
        window.app.removeStudent(student);
        span.remove();
    });
    window.app.container.append(span);
    window.app.addedStudents.push(student);
    if (addOption === false) {
        return;
    }
    var option = $('<option selected></option>');
    option.val(JSON.stringify(student));
    option.attr("data-id", student.Id);
    window.app.studentsList.append(option);
};

window.app.removeStudent = function (student) {
    //window.app.addedStudents[student.Id] = undefined;
    var id = window.app.addedStudents.indexOf(student);
    delete window.app.addedStudents[id];
    window.app.studentsList.children("option[value='" + JSON.stringify(student) + "']").remove();
};

window.app.containStudent = function (student) {
    for (var i = 0; i < window.app.addedStudents.length; i++) {
        if (typeof window.app.addedStudents[i] === 'undefined') {
            continue;
        }
        if (window.app.addedStudents[i].Name == student.Name && window.app.addedStudents[i].Group == student.Group) {
            return true;
        }
    }
    return false;
};

window.app.createStudent = function(Id, Name, Group){
    return { Id: Id, Name: Name, Group: Group };
};

window.app.loadStudents = function (selectElement) {
    var options = $(selectElement).children("option[selected]");
    for (var i = 0; i < options.length; i++) {
        var student = JSON.parse($(options[i]).val());
        if (typeof student.Id == 'undefined' || typeof student.Name == 'undefined' || typeof student.Group == 'undefined') {
            continue;
        }
        window.app.addStudent(student, false);
    }
};

(function(app){
    $(function ($) {
        var form = $("form[data-autocomlete-url]")[0];
        app.url = $(form).attr("data-autocomlete-url");
        app.minimalLength = $(form).attr("data-autocomlete-minimal-length");
        app.container = $("#selected-students-visual");
        app.studentsList = $("#selected-students");
        app.studentName = $("#student");
        app.studentGroup = $("#group");
        app.selectedStudents = $("#students");
        var inputId = $(form).attr("data-autocomlete-input-id");
        var input = $("#" + inputId);
        app.loadStudents(app.studentsList);
        $(input).autocomplete(
        {
            minLength: app.minimalLength,
            source: function (request, response) {
                app.selected = undefined;
                $.ajax({
                    method: "POST",
                    url: app.url,
                    data: {
                        value: request.term,
                    },
                    success: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            data[i].label = data[i].Name;
                        }
                        response(data);
                    },
                    error: function (result, textStatus, errorThrown) {
                        console.log(textStatus);
                        console.log(errorThrown);
                    }
                });
            },
            select: function (event, ui) {
                app.selected = ui.item;
                app.studentName.val(ui.item.Name);
                app.studentGroup.val(ui.item.Group);
                return false;
            }
        });
        $("#add-student").click(function (e) {
            var currentStudent = app.selected;
            var realGroup = app.studentGroup.val();
            if (typeof app.selected == 'undefined' || app.selected.Group != realGroup) {
                currentStudent = app.createStudent(0, app.studentName.val(), realGroup);
                if (currentStudent.Name == "" || currentStudent.Group == "") {
                    return;
                }
            }
            if (app.containStudent(currentStudent)) {
                return;
            }
            app.studentName.val("");
            app.studentGroup.val("");
            app.addStudent(currentStudent);
            app.selected = undefined;
        });
    });
})(window.app);