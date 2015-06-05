(function (window) {
    'use strict';

    // Initial data.
    var data = [{descr: "Taste JavaScript", completed: true}
                ,{descr: "Buy a unicorn", completed: false}];

    // Listen on enter key press to add an entry to the list.
    d3.select('.new-todo').on('keyup', function(){
        if(this.value == "") return;

        if(d3.event.keyCode == 13) {
            data.push({descr: this.value, completed: false});
            update();
            this.value = "";
        }
    });

    d3.select('.clear-completed').on('click', function(){
        data = data.filter(function(d){
            return !d.completed;
        });
        update();
    });

    // Update-exit-remove loop.
    var update = function() {

        var list = d3.select('.todo-list');

        var item = list.selectAll('li')
            .data(data, function(d,i){
                return d.descr + i;
            });

        item.classed('completed', function(d){
            return d.completed;
        });

        item.select('div.view label')
            .text(function(d){
                return d.descr;
            });

        var enter = item.enter().append("li");

        var li = enter.classed('completed', function(d){
            return d.completed;
        });

        var view = li.append('div')
            .attr('class', 'view')
            .on('click', function(d,i){
                console.log(d,i);
            });

        view.append('input')
            .attr('class', 'toggle')
            .attr('type', 'checkbox')
            .attr('checked', function(d){
                return d.completed ? true : null;
            })
            .on('click', function(d){
                d.completed = !d.completed;
                update();
            });

        view.append('label')
            .text(function(d){
                return d.descr;
            }).on('dblclick', function(){
                d3.selectAll('li.editing').classed('editing', false);
                d3.select(this.parentNode.parentNode).classed('editing', true);
            });

        view.append('button')
            .attr('class', 'destroy')
            .on('click', function(d,i){
                data.splice(i,1);
                update();
            });

        li.append('input')
            .attr('class', 'edit')
            .property('value', function(d){
                return d.descr;
            }).on('keyup', function(d){
                if(d3.event.keyCode == 13) {
                    d3.select(this.parentNode).classed('editing', false);
                    d.descr = d3.select(this).property('value');
                    update();
                }
            });

        item.exit().remove();
    }

    // Init list.
    update();

})(window);
