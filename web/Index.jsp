<%-- 
    Document   : Index
    Created on : 2019.12.31., 9:37:08
    Author     : Milán Szlávik <szlavikmilan@gmail.com>
--%>


<%@page import="tools.AnnotationExclusionStrategy"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.io.File"%>
<%@page import="java.io.FileReader"%>
<%@page import="com.google.gson.stream.JsonReader"%>
<%@page import="com.google.gson.reflect.TypeToken"%>
<%@page import="com.google.gson.GsonBuilder"%>
<%@page import="com.google.gson.Gson"%>
<%@page import="model.Card"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" SameSite="None">
        <title>Kibic</title>
        <link rel = "icon" href = "img/icon.png" type = "image/x-icon">
        <link rel="stylesheet" type="text/css" href="css/kibic.css">
        <script type="text/javascript" src="js/kibic.js"></script>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    </head>
    <body onload="startGame()">
        <div>
            <button onclick="clickAndPostGameStatus()">"Click Me!"</button>
            <button onclick="document.getElementById('id01').style.display = 'block'">"Click Me2!"</button>            
        </div>
        <%
            String jsonPath = (new File(request.getRealPath(request.getServletPath())).getParentFile()).getAbsolutePath() + "/js/cards.json";
            JsonReader reader = new JsonReader(new FileReader(jsonPath));
            List<Card> cards = new GsonBuilder()
                    .setExclusionStrategies(new AnnotationExclusionStrategy())
                    //.serializeNulls()
                    //.setDateFormat(DateFormat.LONG)
                    //.setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                    //.setPrettyPrinting()
                    //.registerTypeAdapter(Id.class, IdTypeAdapter())
                    .create().fromJson(reader, new TypeToken<List<Card>>() {
            }.getType());

            Map<String, List<Card>> coloredOrderedCardMap = new HashMap();
            for (int i = 0; i < cards.size(); i++) {
                if (!coloredOrderedCardMap.containsKey(cards.get(i).getColor()) && cards.get(i).getColor() != null) {
                    coloredOrderedCardMap.put(cards.get(i).getColor(), new ArrayList());
                }
            }

            for (int i = 0; i < cards.size(); i++) {
                if (cards.get(i).getColor() != null) {
                    coloredOrderedCardMap.get(cards.get(i).getColor()).add(cards.get(i));
                }
            }
        %>
        <div id="id01" class="modal" name="cardPickerDiv">
            <div class="modal-content">
                <div class="container">
                    <span onclick="document.getElementById('id01').style.display = 'none'" class="close" title="Close">&times;</span>
                    <% for (String key : coloredOrderedCardMap.keySet()) { %>
                    <div name="<% out.print(key); %>" class="card-pick-row">                        
                        <% for (int i = 0; i < coloredOrderedCardMap.get(key).size(); i++) { %>
                        <input type="checkbox" id="<% out.print("chkbox_" + coloredOrderedCardMap.get(key).get(i).getId()); %>" name="<% out.print(coloredOrderedCardMap.get(key).get(i).getId()); %>"/>
                        <label for="<% out.print("chkbox_" + coloredOrderedCardMap.get(key).get(i).getId()); %>">
                            <img src="<% out.print(coloredOrderedCardMap.get(key).get(i).getPath()); %>">
                        </label>
                        <%      } %>
                    </div>
                    <% }%>
                    <button onclick="fillGameStatusFromCardPicker()">Go</button>
                </div>
            </div>
        </div>
    </body>
</html>
