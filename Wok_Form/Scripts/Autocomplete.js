"use strict";

window.app = {
    autocompleteInputs: [],
}

function AutoCompleteObject(input, index) {

    // fields

    this.input = $(input);
    this.addedStudents = [];
    this.url = this.input.attr("data-autocomplete-url");
    this.minimalLength = this.input.attr("data-autocomplete-minimal-length");
    this.container = $("#" + this.input.attr("data-autocomplete-labels-container-id"));
    this.studentsList = $("#" + this.input.attr("data-autocomplete-select-id"));
    this.studentGroup = $("#" + this.input.attr("data-autocomplete-group-input-id"));
    this.addButton = $("#" + this.input.attr("data-autocomplete-add-button-id"));
    this.index = index;

    // functions

    this.addStudent = function (student, addOption) {
        var span = $('<span class="label label-default">' + student.Name + '&nbsp;(' + student.Group + ')' + '<span class="remove glyphicon glyphicon-remove-sign glyphicon-white"></span></span>');
        span.attr("data-input-index", this.index);
        span.click(function () {
            var index = $(this).attr("data-input-index");
            var owner = window.app.autocompleteInputs[index];
            owner.removeStudent(student);
            span.remove();
        });
        this.container.append(span);
        this.addedStudents.push(student);
        if (addOption === false) {
            return;
        }
        var option = $('<option selected></option>');
        option.val(JSON.stringify(student));
        option.attr("data-id", student.Id);
        this.studentsList.append(option);
    };

    this.removeStudent = function (student) {
        //window.app.addedStudents[student.Id] = undefined;
        var id = this.addedStudents.indexOf(student);
        delete this.addedStudents[id];
        this.studentsList.children("option[value='" + JSON.stringify(student) + "']").remove();
    };

    this.containStudent = function (student) {
        for (var i = 0; i < this.addedStudents.length; i++) {
            if (typeof this.addedStudents[i] === 'undefined') {
                continue;
            }
            if (this.addedStudents[i].Name == student.Name && this.addedStudents[i].Group == student.Group) {
                return true;
            }
        }
        return false;
    };

    this.createStudent = function (Id, Name, Group) {
        return { Id: Id, Name: Name, Group: Group };
    };

    this.loadStudents = function (selectElement) {
        var options = $(selectElement).children("option[selected]");
        for (var i = 0; i < options.length; i++) {
            var student = JSON.parse($(options[i]).val());
            if (typeof student.Id == 'undefined' || typeof student.Name == 'undefined' || typeof student.Group == 'undefined') {
                continue;
            }
            this.addStudent(student, false);
        }
    };

    var owner = this;

    var settings = {
        minLength: this.minimalLength,
        source: function (request, response) {
            var index = this.element.data("autocomplete-index");
            var owner = window.app.autocompleteInputs[index];
            owner.selected = undefined;
            $.ajax({
                method: "POST",
                url: owner.url,
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
            var index = $(event.target).data("autocomplete-index");
            var owner = window.app.autocompleteInputs[index];
            owner.selected = ui.item;
            owner.input.val(ui.item.Name);
            owner.studentGroup.val(ui.item.Group);
            return false;
        }
    };

    $(this.input).autocomplete(settings);

    $(this.addButton).click(function (e) {
        var index = $(this).data("autocomplete-index");
        var owner = window.app.autocompleteInputs[index];
        var currentStudent = owner.selected;
        var realGroup = owner.studentGroup.val();
        if (typeof owner.selected == 'undefined' || owner.selected.Group != realGroup) {
            currentStudent = owner.createStudent(0, owner.input.val(), realGroup);
            if (currentStudent.Name == "" || currentStudent.Group == "") {
                return;
            }
        }
        if (owner.containStudent(currentStudent)) {
            return;
        }
        owner.input.val("");
        owner.studentGroup.val("");
        owner.addStudent(currentStudent);
        owner.selected = undefined;
    });

    this.loadStudents(this.studentsList);
    this.input.data("autocomplete-index", this.index);
    this.addButton.data("autocomplete-index", this.index);
}

(function (app) {
    $(function ($) {
        var inputs = $("input[data-autocomplete-url]");
        for (var i = 0; i < inputs.length; i++) {
            app.autocompleteInputs[i] = new AutoCompleteObject(inputs[i], i);
        }
    });
})(window.app);