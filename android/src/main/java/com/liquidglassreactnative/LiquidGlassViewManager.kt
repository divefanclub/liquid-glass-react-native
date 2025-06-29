package com.liquidglassreactnative

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.LiquidGlassViewManagerInterface
import com.facebook.react.viewmanagers.LiquidGlassViewManagerDelegate

@ReactModule(name = LiquidGlassViewManager.NAME)
class LiquidGlassViewManager : SimpleViewManager<LiquidGlassView>(),
    LiquidGlassViewManagerInterface<LiquidGlassView> {
    private val mDelegate: ViewManagerDelegate<LiquidGlassView>

    init {
        mDelegate = LiquidGlassViewManagerDelegate(this)
    }

    override fun getDelegate(): ViewManagerDelegate<LiquidGlassView>? {
        return mDelegate
    }

    override fun getName(): String {
        return NAME
    }

    public override fun createViewInstance(context: ThemedReactContext): LiquidGlassView {
        return LiquidGlassView(context)
    }

    override fun setColor(view: LiquidGlassView?, color: String?) {
        view?.setTintColor(color)
    }

    override fun setAppearance(view: LiquidGlassView?, appearance: String?) {
        appearance?.let { view?.setAppearance(it) }
    }

    override fun setIsInteractive(view: LiquidGlassView?, isInteractive: Boolean?) {
        // Android 暂时不支持交互性，可以在这里添加触摸处理逻辑
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
        return MapBuilder.builder<String, Any>()
            .put("onPress", MapBuilder.of("registrationName", "onPress"))
            .build()
    }

    companion object {
        const val NAME = "LiquidGlassView"
    }
} 