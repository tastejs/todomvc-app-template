(function (window) {
    'use strict';

    // Constants.
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    // Init data from local storage
    var data = JSON.parse(localStorage.getItem('todos-d3')) || [];

    // Listen on enter key press to add an entry to the list.
    d3.select('.new-todo').on('keyup', function () {
    if(this.value.trim() === "") { return; }
        if(d3.event.keyCode === ENTER_KEY) {
            data.push({descr: this.value, completed: false});
            update();
            this.value = "";
        }
    });

    // Listen on clear completed button.
    d3.select('button.clear-completed').on('click', function () {
        data = data.filter(function(d){
            return !d.completed;
        });
        update();
    });

    // Listen on toggle all.
    d3.select('input.toggle-all').on('change', function () {
        var checked = this.checked;
        data.forEach(function(d){
            d.completed = checked;
        });
        update();
    });

    // Listen on route buttons.
    d3.selectAll('ul.filters li').on('click', function () {
        d3.select('ul.filters li a.selected').classed('selected', false);
        d3.select(this).select('a').classed('selected', true);
    });

    // Listen on route changes.
    d3.select(window).on('hashchange', function () {
        update();
    });

    // Filter according to route, and then update.
    var update = function () {
        var filtered = data.filter(function(d){
            if(location.hash === '#/active'){
                return !d.completed;
            }
            if(location.hash === '#/completed'){
                return d.completed;
            }
            return true;
        });

        data_bind(filtered);

        // Adjust other parts of page
        var left = data.filter(function(d){
            return !d.completed;
        }).length;
        d3.select('span.todo-count strong.count')
            .text(left);
        d3.select('span.todo-count span.plural')
            .text(left === 1 ? "" : "s");
        d3.selectAll('section.main, footer.footer')
            .classed('hidden', data.length === 0);

        // Update local storage
        localStorage.setItem('todos-d3', JSON.stringify(data));
    };

    // Update-exit-remove loop.
    var data_bind = function(filtered) {

        var list = d3.select('.todo-list');

        // DATA JOIN
        // Join new data with old elements.
        var item = list.selectAll('li')
            .data(filtered, function(d,i){
                return d.descr + i;
            });

        // UPDATE
        // Update old elements.
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

        // ENTER
        // Create new elements, if any.
        var li = item.enter()
            .append("li")
            .classed('completed', function(d){
                return d.completed;
            });

        var view = li.append('div')
            .attr('class', 'view');

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
            }).on('dblclick', function(d,i){
                li.each(function(e, j){
                    if(i === j){
                        d3.select(this).classed('editing',true);
                        d3.select(this).select('input.edit').each(function () {
                            this.focus();
                        });
                    } else {
                        d3.select(this).classed('editing',false);
                    }
                });
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
            })
            .on('blur', function(d, i){
                li.classed('editing', false);
            })
            .on('keyup', function(d){
                if(d3.event.keyCode === ENTER_KEY) {
                    li.classed('editing', false);
                    d.descr = d3.select(this).property('value');
                    update();
                }
                if (d3.event.keyCode === ESCAPE_KEY){
                    li.classed('editing', false);
                }
            });

        // EXIT
        // Remove old elements.
        item.exit().remove();
    };

    // Init list.
    update();

})(window);
