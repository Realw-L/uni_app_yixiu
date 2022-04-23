<template>
	<view>
		<view class="grace-form-item " style="display: flex; justify-content: space-between; border-radius: 50upx; background-color: #FFFFFF;padding: 30upx;">
						<view >
							<input type="text"  name="name" v-model="name2" placeholder="请输入昵称" />
						</view>
						<view>
						<text class="grace-icons icon-close grace-form-icon grace-text-center" v-if="name2 != ''" @tap="clearInput"></text>
						</view>
					</view>
					<view style="display: flex; flex-direction: row; margin-top: 50upx;">
						<button type="primary" style="background-color: #6cb231; color: #FFFFFF; width: 700upx;">完成</button>
					</view>
	</view>
</template>

<script>
import gracePage from "../../graceUI/components/gracePage.vue";
export default {
    data() {
        return {
			name2 : '',
        }
    },
    methods:{
		clearInput : function(){
			this.name2 = '';
		},

    },
	components: {
		gracePage
	}
}
</script>
<style>
.grace-border-b{border-color:#F8F8F8;}
.grace-check-item-v{width:100%; padding:15rpx 0;}
</style>