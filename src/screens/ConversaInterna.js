import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, BackHandler, FlatList, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { setActiveChat } from '../actions/ChatActions';
import MensagemItem from '../components/ConversaInterna/MensagemItem';

export class ConversaInterna extends Component {

	static navigationOptions = ({navigation}) => ({
		title:navigation.state.params.title,
		tabBarVisible:false,
		headerLeft:(
			<TouchableHighlight onPress={()=>{navigation.state.params.voltarFunction()}} underlayColor={false}>
				<Image source={require('react-navigation/src/views/assets/back-icon.png')} style={{width:25, height:25, marginLeft:20}} />
			</TouchableHighlight>
		)
	})

	constructor(props) {
		super(props);
		this.state = {
			tmpMsg:	[
				{key:1, date:'2018-01-01 15:00', uid:123, m:'Oi, tudo bem?'},
				{key:2, date:'2018-01-01 15:00', uid:'eG88qztfQFSJbUgghalTLh7ojj73', m:'Tudo, e você?'},
				{key:3, date:'2018-01-01 15:00', uid:123, m:'Ok, legal.'},
				{key:4, date:'2018-01-01 15:00', uid:'eG88qztfQFSJbUgghalTLh7ojj73', m:'Esta é uma mensagem maior para fins de teste de estilização e configuração de layout.'},
				{key:5, date:'2018-01-01 15:00', uid:'eG88qztfQFSJbUgghalTLh7ojj73', m:'Tchau brigado'}
			]
		};

		this.voltar = this.voltar.bind(this);
	}

	componentDidMount() {
		this.props.navigation.setParams({voltarFunction:this.voltar});
		BackHandler.addEventListener('hardwareBackPress', this.voltar);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.voltar);
	}

	voltar() {
		this.props.setActiveChat('');
		this.props.navigation.goBack();

		return true;
	}

	render() {
		return(
			<View style={styles.container}>
				<FlatList 
					style={styles.chatArea}
					data={this.state.tmpMsg}
					renderItem={({item})=><MensagemItem data={item} me={this.props.uid} />}
				/>
				<View style={styles.sendArea}>
					<TextInput style={styles.sendInput} value={this.props.uid} />
					<TouchableHighlight style={styles.sendButton}>
						<Image style={styles.sendImage} source={require('../assets/images/send.png')} />
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	chatArea:{
		flex:1,
		backgroundColor:'#CCCCCC'
	},
	sendArea:{
		height:50,
		backgroundColor:'#EEEEEE',
		flexDirection:'row'
	},
	sendInput:{
		height:50,
		flex:1
	},
	sendButton:{
		width:50,
		height:50,
		justifyContent:'center',
		alignItems:'center'
	},
	sendImage:{
		width:40,
		height:40
	}
});

const mapStateToProps = (state) => {
	return{
		status:state.auth.status,
		uid:state.auth.uid
	};
};

const ConversaInternaConnect = connect(mapStateToProps, { setActiveChat })(ConversaInterna);
export default ConversaInternaConnect;