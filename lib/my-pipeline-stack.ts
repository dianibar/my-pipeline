import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SecretValue } from "aws-cdk-lib";
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class MyPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('dianibar/my-pipeline', 'main',
        {
				  authentication: SecretValue.secretsManager("github-token")
			  }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    });
  }
}
