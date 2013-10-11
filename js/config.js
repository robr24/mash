window._skel_config = {
	prefix: 'css/vendor/panel-style',
	preloadStyleSheets: true,
	resetCSS: false,
//	resetScroll: false,
	swipeToClose: true,
	boxModel: 'border',
	grid: { gutters: 30 },
	breakpoints: {
		wide: { range: '1200-', containers: 1140, grid: { gutters: 50 } },
		narrow: { range: '481-1199', containers: 960 },
		narrower: { range: '481-960', containers: 'fluid' },
		mobile: { range: '-480', containers: 'fluid', lockViewport: true, grid: { collapse: true } }
	}
};

window._skel_panels_config = {
	panels: {
		bottomPanel: {
			position: 'bottom',
			size: "70%"
			/*
				Since this panel is a bit more complicated, we're omitting its 'html' option and
				defining it inline (ie. in index.html).
			*/
		}
	},
	overlays: {
		audioScrubber: {
			position: 'bottom-center',
			width: "100%",
			height: 60
//			html:	'<a href="#" class="toggle icon-envelope" data-action="togglePanel" data-args="bottomPanel">TOGGLE</a>'
		}
	}
};