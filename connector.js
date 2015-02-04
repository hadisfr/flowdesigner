/**
 * Connector class.
 *
 * @copyright   copyright (c) 2015 by Harald Lapp
 * @author      Harald Lapp <harald@octris.org>
 */

;diagram.connector = (function() {
    /**
     * Constructor.
     *
     * @param   string          type            Type of connector.
     * @param   diagram.node    node            The node the connector belongs to.
     * @param   object          data            Connector data.
     */
    function connector(type, node, data)
    {
        this.type = type;
        this.node = node;
        this.data = data;

        this.cn = null;
    }
    
    /**
     * Render connector.
     *
     * @param   D3Node      parent              Parent node to render connector at.
     * @param   int         x                   X-Position of connector.
     * @param   int         y                   Y-Position of connector.
     */
    connector.prototype.render = function(parent, x, y)
    {
        var me = this;
        
        this.cn = parent.data([{'x': x, 'y': y}]).append('circle').attr({
            'cx': function(d) { return d.x; },
            'cy': function(d) { return d.y; },
            'r': 6,
            'stroke': 'black',
            'stroke-width': 2,
            'fill': 'white'
        });
        
        var label = parent.append('text').text(this.data.label).attr({
            'alignment-baseline': 'middle',
            'stroke': 'none',
            'fill': 'white',
            'x': x + 10,
            'y': y + 2
        });
        
        if (this.type == 'output') {
            this.cn.attr('cursor', 'crosshair');
            
            label.attr({
                'x': x - 10,
                'text-anchor': 'end'
            });
            
            this.cn.call((function() {
                var drag = d3.behavior.drag();

                drag.on('dragstart', function(d) {
                    d3.event.sourceEvent.stopPropagation();

                    me.onDragStart(d);
                }).on('drag', function(d) {
                    me.onDrag(d);
                }).on('dragend', function(d) {
                    me.onDragEnd(d);
                });

                return drag;
            })());
        } else {
            this.cn.on('mouseover', function() {
                me.onMouseOver();
            }).on('mouseout', function() {
                me.onMouseOut()
            });
        }
    }
    
    /**
     * Return type of connector ('input' or 'output').
     *
     * @return  string                          Type of connector.
     */
    connector.prototype.getType = function()
    {
        return this.type;
    }
    
    /*
     * Events.
     */
    connector.prototype.onDragStart = function(d)
    {
    }
    
    connector.prototype.onDrag = function(d)
    {
    }

    connector.prototype.onDragEnd = function(d)
    {
    }

    connector.prototype.onMouseOver = function(d)
    {
    }

    connector.prototype.onMouseOut = function(d)
    {
    }

    
    
    return connector;
})();
