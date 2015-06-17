package com.geetest.sdk.java.msg.demo;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.geetest.sdk.java.GeetestLib;
import com.geetest.sdk.java.GeetestMsgLib;

/**
 * 二次的短信验证
 * 
 * @author zheng
 *
 */
public class ValidateMsgServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		// get session to share the object
		GeetestMsgLib gtMsg = GeetestMsgLib.getGtMsgSession(request);

		int gtResult = -10;

		try {
			gtResult = gtMsg.validateMsgCode(request);
			gtMsg.gtlog(String.format("msg validate result:%s", gtResult));

		} catch (Exception e) {
			e.printStackTrace();
		}

		// TODO 二次短信验证结果处理

		if (gtResult == 1) {
			// TODO handle the Success result
			PrintWriter out = response.getWriter();
			out.println(gtResult);

		} else {
			// TODO handle the Fail result
			PrintWriter out = response.getWriter();
			out.println(gtResult);
		}

	}
}