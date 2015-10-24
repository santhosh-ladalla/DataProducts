shinyUI(fluidPage(theme = "bootstrap.css",
  
  # Application title.
  titlePanel("Predict Miles Per Gallon"),
  
  # Sidebar with controls to select a dataset and specify the
  # number of observations to view. The helpText function is
  # also used to include clarifying text. Most notably, the
  # inclusion of a submitButton defers the rendering of output
  # until the user explicitly clicks the button (rather than
  # doing it immediately when inputs change). This is useful if
  # the computations required to render output are inordinately
  # time-consuming.
  sidebarLayout(
    sidebarPanel(
      
      tags$head(
        tags$style("body { background: url('./cars1.jpg') no-repeat center center fixed;background-size: contain; }")),
        
      selectInput("Transmission", "Choose a Transmission:", 
                  choices = c("Manual", "Automatic")),
      
      sliderInput("Weight", "Choose a weight (lb/1000) :", min =1, max =5, value =1, step =0.1,ticks = TRUE),
      
      numericInput("Qsec", "Choose a qsec (1/4 mile time) :", 14 ,min = 14,max= 20,step = 0.5),
      
      submitButton("Submit")
    ),
    
    # Show a summary of the dataset and an HTML table with the
    # requested number of observations. Note the use of the h4
    # function to provide an additional header above each output
    # section.
    mainPanel(
      tabsetPanel(
        tabPanel("Selected Values and Prediction",
      h4("Selected Values"),

      tableOutput("values"),
      
      h4("Predicted Miles Per Gallon "),
      
      h4(textOutput("predict"))
      
    ),
      tabPanel("Documentation", includeHTML('./Documentation.html'))
    ))
    

  )
))