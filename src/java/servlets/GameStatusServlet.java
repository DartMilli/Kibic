/*
 * property of Milán Szlávik
 */
package servlets;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import model.GameStatus;

/**
 *
 * @author Milán Szlávik <szlavikmilan@gmail.com>
 */
public class GameStatusServlet extends HttpServlet {

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        BufferedReader reader = request.getReader();

        //https://stackoverflow.com/questions/4112686/how-to-use-servlets-and-ajax
        //https://www.w3schools.com/howto/howto_css_login_form.asp
        //https://github.com/google/gson/blob/master/UserGuide.md
        //https://www.mkyong.com/java/how-to-parse-json-with-gson/        
        GameStatus gs = new Gson().fromJson(reader, GameStatus.class);
        System.out.println(gs);

        boolean ajax = "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));

        if (ajax) {
            // Handle ajax (JSON or XML) response.
        } else {
            // Handle regular (JSP) response.
        }

        gs.setTalon(new ArrayList<>());
        String responseJsonStr = new Gson().toJson(gs);
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(responseJsonStr);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
