;(function($){
    var pluginName = 'donutGraph',
        defaults = {
            value: 100,
            animate: false
        };

    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._pluginName = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
            this.decorate();
            this.draw();
        },

        decorate: function() {
            this.$el.prepend('<div class="donut-graph"><div class="donut-graph-percent"><span></span></div><div class="donut-graph-slide"></div></div>');
        },

        draw: function() {
            var percentage = Math.min(this.options.value, 100);
            this.$el.find('.donut-graph').html('<div class="donut-graph-percent"><span></span></div><div class="donut-graph-slice'+(percentage > 50?' gt50':'')+'"><div class="donut-graph-pie"></div>'+(percentage > 50?'<div class="donut-graph-pie donut-graph-fill"></div>':'')+'</div>');
            var deg = 360 / 100 * percentage;
            this.$el.find('.donut-graph-pie:not(.donut-graph-fill)').css({
                '-moz-transform':'rotate('+deg+'deg)',
                '-webkit-transform':'rotate('+deg+'deg)',
                '-o-transform':'rotate('+deg+'deg)',
                'transform':'rotate('+deg+'deg)'
            });
            this.$el.find('.donut-graph-percent span').html((this.options.value < 1 && this.options.value > 0 ? this.options.value.toFixed(1) : Math.round(this.options.value))+'%');
        }
    }

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        });
    }

    $(function () {
        $('body').find('[data-graph="donut"]').each(function (e) {
            var $this = $(this);
            if ($this.data("plugin_" + pluginName)) return;
            $this[pluginName]($this.data());
        });
    });

})(jQuery);