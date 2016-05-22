## ftree2widget.R
## handle data and possible SVG options and prepare as list for htmlwidgets::createWidget function call
ftree2widget<-function(DF, height = NULL, width = NULL)  {
	if(!ftree.test(DF)) stop("first argument must be a fault tree")	

## Convert json formatted data to list format (so it can be converted back by htmlwidgets)
root <- jsonlite::fromJSON(ftree2json(DF), simplifyDataFrame = FALSE)
	
    # create widget
    htmlwidgets::createWidget(
        name = "ftree_widget",
        x = list(root=root),
        width = width,
        height = height,
        htmlwidgets::sizingPolicy(padding = 10, browser.fill = TRUE),
        package = "FaultTree.widget"
    )	
}