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

    // Listen on clear completed button.
    d3.select('.clear-completed').on('click', function(){
        data = data.filter(function(d){
            return !d.completed;
        });
        update();
    });

    // Listen on toggle all.
    d3.select('input.toggle-all').on('change', function(){
        var checked = this.checked;
        data.forEach(function(d){
            d.completed = checked;
        });
        update();
    });

    // Listen on route changes.
    d3.select(window).on('hashchange', function(){
        update()
    });

    // Filter according to route, and then update.
    var update = function(){
        var filtered = data.filter(function(d){
            if(location.hash == '#/active'){
                return !d.completed;
            }
            if(location.hash == '#/completed'){
                return d.completed;
            }
            return true;
        });
        update0(filtered);
    };

    // Update-exit-remove loop.
    var update0 = function(filtered) {

        var list = d3.select('.todo-list');

        var item = list.selectAll('li')
            .data(filtered, function(d,i){
                return d.descr + i;
            });

        item.classed('completed', function(d){
            return d.completed;
        });

        item.select('div.view label')
            .text(function(d){
                return d.descr;
            });

        item.select('input.toggle')
            .property('checked', function(d){
                return d.completed;
            });

        var enter = item.enter()
            .append("li");

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
            .property('checked', function(d){
                return d.completed;
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
