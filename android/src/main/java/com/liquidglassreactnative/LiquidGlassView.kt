package com.liquidglassreactnative

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.view.View
import android.view.MotionEvent

class LiquidGlassView : View {

    private val paint = Paint().apply {
        isAntiAlias = true
        color = Color.parseColor("#80FFFFFF") // 半透明白色
        style = Paint.Style.FILL
    }

    constructor(context: Context) : super(context) {
        // 设置背景为透明
        setBackgroundColor(Color.TRANSPARENT)
        
        // 启用触摸事件
        isClickable = true
        isFocusable = true
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        
        // 绘制圆角矩形作为玻璃效果
        val radius = 20f
        canvas.drawRoundRect(0f, 0f, width.toFloat(), height.toFloat(), radius, radius, paint)
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        when (event.action) {
            MotionEvent.ACTION_DOWN -> {
                // 按下时的视觉反馈
                alpha = 0.8f
                return true
            }
            MotionEvent.ACTION_UP -> {
                // 抬起时恢复透明度
                alpha = 1.0f
                // 触发点击事件
                performClick()
                return true
            }
            MotionEvent.ACTION_CANCEL -> {
                // 取消时恢复透明度
                alpha = 1.0f
                return true
            }
        }
        return super.onTouchEvent(event)
    }

    override fun performClick(): Boolean {
        // 这里可以添加自定义的点击处理逻辑
        return super.performClick()
    }

    fun setTintColor(color: String?) {
        color?.let {
            try {
                paint.color = Color.parseColor(it)
                invalidate()
            } catch (e: IllegalArgumentException) {
                // 如果颜色解析失败，使用默认颜色
                paint.color = Color.parseColor("#80FFFFFF")
                invalidate()
            }
        }
    }

    fun setAppearance(appearance: String) {
        val color = when (appearance) {
            "dark" -> Color.parseColor("#80000000") // 半透明黑色
            "light" -> Color.parseColor("#80FFFFFF") // 半透明白色
            else -> Color.parseColor("#80FFFFFF") // 默认半透明白色
        }
        paint.color = color
        invalidate()
    }
} 