palette(c("#E41A1C", "#377EB8", "#4DAF4A", "#984EA3",
          "#FF7F00", "#FFFF33", "#A65628", "#F781BF", "#999999"))

library(datasets)

fit <- lm(mpg ~ wt + qsec + am,data=mtcars)

shinyServer(function(input, output, session) {
  
  Val <- reactive({
    
    # Compose data frame
    data.frame(Trasmission = input$Transmission,
               Weight = input$Weight ,
               Qsec = input$Qsec )
  }) 
  
  # Show the values using an HTML table
  output$values <- renderTable({
    Val()
  },include.rownames=FALSE)
  
  output$predict <- renderText({predict(fit, data.frame(am = ifelse(input$Transmission == "Manual",1,0),
                                             wt = input$Weight ,
                                             qsec = input$Qsec))
  })
  
  output$documentation <- renderText({  
    readLines("./Documentation.html")  
  })
  
})